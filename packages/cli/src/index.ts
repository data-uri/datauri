#!/usr/bin/env node
import minimist from "minimist";
import { version } from "../package.json";
import cli, { type CLIFlags } from "./cli";

const flags = minimist<CLIFlags>(process.argv.slice(2));

(async () => {
  if (
    Object.prototype.hasOwnProperty.call(flags, "_") &&
    flags._.length &&
    flags.help !== true
  ) {
    await cli(flags);
  } else if (flags.version === true) {
    console.log(`v${version}`);
  } else {
    console.log(
      [
        `\nData-URI CLI (v${version}) usage:`,
        "\ndatauri <target_file>",
        "datauri <target_file> --css",
        "datauri <target_file> --copy",
        "datauri <target_file> --css --copy",
        "datauri <target_file> --css=<css_output>",
        "datauri <target_file> --css=<css_output> --className=<css_class_name>",
        "datauri <target_file> --css=<css_output> --className=<css_class_name> --width --height",
        "datauri <target_file> --css=<css_output> --className=<css_class_name> --backgroundSize",
        "datauri --version\n",
      ].join("\n"),
    );
  }
})();
