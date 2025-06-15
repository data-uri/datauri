#!/usr/bin/env node
import minimist from "minimist";
import cli, { type CLIFlags } from "./cli";

const flags = minimist<CLIFlags>(process.argv.slice(2));

(async () => {
  if (
    Object.prototype.hasOwnProperty.call(flags, "_") &&
    flags._.length &&
    flags.help !== true
  ) {
    await cli(flags);
  } else {
    console.log(
      [
        "\nData-uri usage:",
        "\ndatauri <target_file>",
        "datauri <target_file> --css",
        "datauri <target_file> --copy",
        "datauri <target_file> --css --copy",
        "datauri <target_file> --css=<css_output>",
        "datauri <target_file> --css=<css_output> --className=<css_class_name>",
        "datauri <target_file> --css=<css_output> --className=<css_class_name> --width --height",
        "datauri <target_file> --css=<css_output> --className=<css_class_name> --backgroundSize",
      ].join("\n"),
    );
  }
})();
