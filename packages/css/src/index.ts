import path from "node:path";
import type { DataURIParser } from "datauri";
import { imageSize } from "image-size";
import type { ISize } from "image-size/dist/types/interface";
import { cssParser } from "./template/cssTemplate";

const defaultCSSConfig = {};

function createClassName(fileName: string) {
	return path.basename(fileName, path.extname(fileName));
}

export interface DatauriCSSConfig {
	width?: boolean;
	height?: boolean;
	backgroundSize?: boolean;
	className?: string;
	dimensions?: ISize;
}

/**
 * Parses a Data URI and generates CSS based on the provided configuration.
 *
 * @param {DataURIParser} parser - An instance of DataURIParser containing the file and content to parse.
 * @param {DatauriCSSConfig} [config=defaultCSSConfig] - Configuration options for generating CSS.
 * @param {boolean} [config.width] - Whether to include the width of the image in the CSS.
 * @param {boolean} [config.height] - Whether to include the height of the image in the CSS.
 * @param {boolean} [config.backgroundSize] - Whether to include the background-size property in the CSS.
 * @param {string} [config.className] - Custom class name for the generated CSS.
 * @param {ISize} [config.dimensions] - Dimensions of the image (width and height).
 * @returns {Promise<string>} - A string containing the generated CSS.
 * @throws {Error} - Throws an error if the parser is not initialized with a valid file and content.
 */
export default async function DataURICSSParser(
	parser: DataURIParser,
	config: DatauriCSSConfig = defaultCSSConfig,
): Promise<string> {
	const ast: DatauriCSSConfig = {
		...defaultCSSConfig,
		...config,
	};

	if (!parser.buffer || !parser.fileName || !parser?.content) {
		throw new Error(
			"DataURIParser must be initialized with a valid file and content.",
		);
	}

	if ((ast.width || ast.height || ast.backgroundSize) && parser.buffer) {
		ast.dimensions = imageSize(parser.buffer);
	}

	return cssParser({
		...ast,
		className: ast.className ?? createClassName(parser.fileName),
		background: parser.content,
	});
}
