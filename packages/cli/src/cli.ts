import type { DatauriCSSConfig } from "@datauri/css";
import { DataURIParser } from "datauri/parser";
import type { ParsedArgs } from "minimist";
import { existsSync, promises as fs } from "node:fs";

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

export type CLIFlags = {
  _: string[];
  css?: string;
  copy?: boolean;
  className?: string;
  width?: boolean;
  height?: boolean;
  backgroundSize?: boolean;
  help?: boolean;
  version?: boolean;
  debug?: boolean;
};

class CLI {
  private flags: CLIFlags;
  private filePath: string;
  private output: (content: string) => void = () => {};
  private parser: DataURIParser;

  constructor(flags: CLIFlags) {
    this.flags = flags;
    this.filePath = flags._[0];
    this.parser = new DataURIParser();
    this.debug(`CLI initialized with flags: ${JSON.stringify(flags)}`);
  }

  setOutputHandler(output: (content: string) => void) {
    this.output = output;
    this.debug("Output handler set.");
  }

  debug(message: string) {
    if (this.flags.debug) {
      console.log(`[DEBUG] ${message}`);
    }
  }

  async run() {
    this.debug(`Running CLI with file path: ${this.filePath}`);
    const parsedData = await this.parser.encode(this.filePath);

    if (!parsedData) {
      throw new Error(`Error parsing file: ${this.filePath}`);
    }

    this.debug(`File parsed successfully: ${this.filePath}`);

    if (this.flags.css) {
      this.debug("CSS flag detected. Processing CSS.");
      const { DataURICSSParser } = await import("@datauri/css");
      return this.css(
        this.flags.css,
        await DataURICSSParser(
          this.parser.getMeta(),
          this.flags.css as DatauriCSSConfig,
        ),
      );
    }

    this.debug("Outputting parsed data.");
    this.output(parsedData);
  }

  async writeCSS(file: string, content: string, action: string) {
    this.debug(`Writing CSS to file: ${file}, action: ${action}`);
    await fs.writeFile(file, content, "utf-8");
    console.log(`File ${action}: ${file}`);
  }

  async processCSSFile(file: string, content: string) {
    this.debug(`Processing CSS file: ${file}`);
    if (existsSync(file)) {
      this.debug(`File exists. Reading content: ${file}`);
      const cssContent = await fs.readFile(file, "utf-8");
      return this.writeCSS(file, cssContent + content, "updated");
    }

    this.debug(`File does not exist. Creating new file: ${file}`);
    this.writeCSS(file, content, "created");
  }

  css(...args: [string, string]) {
    this.debug(`Processing CSS with arguments: ${JSON.stringify(args)}`);
    if (typeof args[0] === "string") {
      return this.processCSSFile(...args);
    }

    this.debug("Outputting CSS content.");
    this.output(args[1]);
  }
}

export default (flags: CLIFlags & ParsedArgs): Promise<void> => {
  const cli = new CLI(flags);
  const outputHandler = flags.copy ? clipboard : console.log;

  cli.setOutputHandler(outputHandler);
  cli.debug("CLI execution started.");

  return cli.run();
};
