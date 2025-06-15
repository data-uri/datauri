import { promises as fs, existsSync } from "node:fs";
import type { DatauriCSSConfig } from "@datauri/css";
import { DataURIParser } from "datauri/parser";

const clipboard = async (content: string) => {
	const { default: clipboardy } = await import("clipboardy");

	try {
		await clipboardy.write(content);
		console.log("Data URI copied to clipboard.");
	} catch (err) {
		console.error("Failed to copy to clipboard:", err);
		return;
	}
};

interface Flags {
	_: string[];
	css?: string;
	copy?: boolean;
}

class Cli {
	private flags: Flags;
	private filePath: string;
	private output: (content: string) => void = () => {};
	private parser: DataURIParser;

	constructor(flags: Flags) {
		this.flags = flags;
		this.filePath = flags._[0];
		this.parser = new DataURIParser();
	}

	setOutputHandler(output: (content: string) => void) {
		this.output = output;
	}

	async run() {
		const parsedData = await this.parser.encode(this.filePath);

		if (!parsedData) {
			throw new Error(`Error parsing file: ${this.filePath}`);
		}

		if (this.flags.css) {
			const { DataURICSSParser } = await import("@datauri/css");
			return this.css(
				this.flags.css,
				await DataURICSSParser(
					this.parser.getMeta(),
					this.flags.css as DatauriCSSConfig,
				),
			);
		}

		this.output(parsedData);
	}

	async writeCSS(file: string, content: string, action: string) {
		await fs.writeFile(file, content, "utf-8");
		console.log(`File ${action}: ${file}`);
	}

	async processCSSFile(file: string, content: string) {
		if (existsSync(file)) {
			const cssContent = await fs.readFile(file, "utf-8");
			return this.writeCSS(file, cssContent + content, "updated");
		}

		this.writeCSS(file, content, "created");
	}

	css(...args: [string, string]) {
		if (typeof args[0] === "string") {
			return this.processCSSFile(...args);
		}

		this.output(args[1]);
	}
}

export default (flags: Flags): Promise<void> => {
	const cli = new Cli(flags);
	const outputHandler = flags.copy ? clipboard : console.log;

	cli.setOutputHandler(outputHandler);

	return cli.run();
};
