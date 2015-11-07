import fs from 'fs';

const DataURIPath = process.env.DATAURI_N || 'datauri';
const DataURI = require(DataURIPath);

class Cli {
  constructor(flags) {
    this.flags = flags;
    this.dataURI = new DataURI(flags._[0]);
  }

  output() {
    if (this.flags.css) {
      return this.css(this.flags.css, this.dataURI.getCSS(this.flags));
    }

    console.log(this.dataURI.content);
  }

  writeCSS(file, content, action) {
    fs.writeFile(file, content, 'utf-8', (err) => {
      if (err) {
        throw err;
      }

      console.log(`File ${action}: ${file}`);
    });
  }

  css(file, content) {
    if (fs.existsSync(file)) {
      fs.readFile(file, 'utf-8', (err, cssContent) => {
        this.writeCSS(file, cssContent + content, 'updated');
      });
    } else {
      this.writeCSS(file, content, 'created');
    }
  }
}

export default (flags) => {
  const cli = new Cli(flags);

  cli.output();
};
