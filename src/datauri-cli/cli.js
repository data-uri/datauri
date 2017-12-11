'use strict';
const fs = require('fs');
const copy = require('copy-paste').copy;
const DataURIPath = process.env.DATAURI_REQUIRE_PATH || 'datauri';
const DataURI = require(DataURIPath);
const clipboard = content =>
  copy(content, err => console.log(!err ? 'Copied!' : err));

class Cli {
  constructor(flags) {
    this.flags = flags;
    this.dataURI = new DataURI(flags._[0]);
  }

  setOutputHandler(output) {
    this.output = output;
  }

  run() {
    if (this.flags.css) {
      return this.css(this.flags.css, this.dataURI.getCSS(this.flags));
    }

    this.output(this.dataURI.content);
  }

  writeCSS(file, content, action) {
    fs.writeFile(file, content, 'utf-8', (err) => {
      if (err) {
        throw err;
      }

      console.log(`File ${action}: ${file}`);
    });
  }

  processCSSFile(file, content) {
    if (fs.existsSync(file)) {
      return fs.readFile(file, 'utf-8', (err, cssContent) => {
        this.writeCSS(file, cssContent + content, 'updated');
      });
    }

    this.writeCSS(file, content, 'created');
  }

  css() {
    if (typeof arguments[0] === 'string') {
      return this.processCSSFile.apply(this, arguments);
    }

    this.output(arguments[1]);
  }
}

module.exports = (flags) => {
  const cli = new Cli(flags);
  const outputHandler = flags.copy ? clipboard : console.log;

  cli.setOutputHandler(outputHandler);
  cli.run();
};
