'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
const { promises: fs, existsSync } = require('fs');
const copy = require('copy-paste').copy;
const DataURIPath = process.env.DATAURI_REQUIRE_PATH || 'datauri';
const DataURICSSPath = process.env.DATAURI_CSS_PATH || 'datauri/css';
const DataURI = require(DataURIPath);
const DataURICSS = require(DataURICSSPath);
const clipboard = (content) => copy(content, (err) => console.log(!err ? 'Copied!' : err));

class Cli {
  constructor(flags) {
    this.flags = flags;
    this.filePath = flags._[0];
  }

  setOutputHandler(output) {
    this.output = output;
  }

  async run() {
    if (this.flags.css) {
      return this.css(this.flags.css, await DataURICSS(this.filePath, this.flags));
    }

    return this.output(await DataURI(this.filePath));
  }

  async writeCSS(file, content, action) {
    await fs.writeFile(file, content, 'utf-8');
    console.log(`File ${action}: ${file}`);
  }

  async processCSSFile(file, content) {
    if (existsSync(file)) {
      const cssContent = await fs.readFile(file, 'utf-8');

      return this.writeCSS(file, cssContent + content, 'updated');
    }

    return this.writeCSS(file, content, 'created');
  }

  css(...args) {
    if (typeof args[0] === 'string') {
      return this.processCSSFile(...args);
    }

    return this.output(args[1]);
  }
}

module.exports = (flags) => {
  const cli = new Cli(flags);
  const outputHandler = flags.copy ? clipboard : console.log;

  cli.setOutputHandler(outputHandler);

  return cli.run();
};
