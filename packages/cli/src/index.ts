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
    const commandsHelp = [
      {
        command: "datauri <target_file>",
        description: "Generate a Data URI for the specified target file.",
      },
      {
        command: "datauri --version",
        description: "Display the current version of the Data-URI CLI.",
      },
      {
        command: "datauri <target_file> --css",
        description: "Generate a Data URI and output it as CSS.",
      },
      {
        command: "datauri <target_file> --css --debug",
        description: "Generate a Data URI as CSS with debug information.",
      },
      {
        command: "datauri <target_file> --css --copy",
        description: "Generate a Data URI as CSS and copy it to the clipboard.",
      },
      {
        command: "datauri <target_file> --css=<css_output>",
        description:
          "Generate a Data URI as CSS and save it to the specified output file.",
      },
      {
        command:
          "datauri <target_file> --css=<css_output> --className=<css_class_name>",
        description: "Generate a Data URI as CSS with a specified class name.",
      },
      {
        command:
          "datauri <target_file> --css=<css_output> --className=<css_class_name> --width --height",
        description:
          "Generate a Data URI as CSS with class name, width, and height properties.",
      },
      {
        command:
          "datauri <target_file> --css=<css_output> --className=<css_class_name> --backgroundSize",
        description:
          "Generate a Data URI as CSS with class name and background-size property.",
      },
      {
        command: "datauri <target_file> --copy",
        description: "Generate a Data URI and copy it to the clipboard.",
      },
    ];

    const relevantCommands = commandsHelp.filter((cmd) => {
      const activeFlags = Object.entries(flags)
        .filter(
          ([key, value]) => value === true && key !== "_" && key !== "help",
        )
        .map(([key]) => `--${key}`);

      return activeFlags.every((flag) => cmd.command.includes(flag));
    });

    const displayCommands =
      relevantCommands.length > 0 ? relevantCommands : commandsHelp;

    console.log(`
Data-URI CLI (v${version}) usage:\n
${displayCommands
  .map(({ command, description }) => `# ${description}\n  ${command}\n`)
  .join("\n")}
    `);
  }
})();
