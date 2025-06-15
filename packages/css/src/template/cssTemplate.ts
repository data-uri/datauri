import type { ISizeCalculationResult } from "image-size/dist/types/interface";
import type { DatauriCSSConfig } from "../";

type ImageDimensions = ISizeCalculationResult;

type CSS_AST = DatauriCSSConfig & {
	className: string;
	background: string;
	dimensions?: ImageDimensions;
};

const spacesChar = "  ";

const propMap = new Map<string, (size: ImageDimensions) => string>([
	[
		"backgroundSize",
		(size) => `background-size: ${size.width}px ${size.height}px`,
	],
	["width", (size) => `width: ${size.width}px`],
	["height", (size) => `height: ${size.height}px`],
]);

const parseImageSize = (ast: CSS_AST) =>
	Object.keys(ast).reduce<string[]>((rule, propName) => {
		const prop = propMap.get(propName);

		if (prop && ast.dimensions) {
			return rule.concat(`${spacesChar}${prop(ast.dimensions)};`);
		}

		return rule;
	}, []);

export const cssParser = (ast: CSS_AST): string =>
	[
		"",
		`.${ast.className.replace(/\s+/gi, "_")} {`,
		`${spacesChar}background-image: url('${ast.background}');`,
	]
		.concat(...(ast.dimensions ? [parseImageSize(ast), "}"] : ["}"]))
		.join("\n");
