import fs from 'fs';
import DataURI from './';

class Cli {
  constructor(flags) {
    this.flags = flags;
    this.dataURI = new DataURI(flags._[0]);

    this.output();
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

export default Cli;
