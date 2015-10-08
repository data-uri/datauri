import { EventEmitter } from 'events';
import path from 'path';
import fs from 'fs';
import mimer from 'mimer';
import uri from './template/uri';
import css from './template/css';

const existsSync = fs.existsSync;
const exists     = fs.exists;

class Api extends EventEmitter {
  constructor() {
    super();
  }

  format(fileName, fileContent) {
      fileContent   = (fileContent instanceof Buffer) ? fileContent : new Buffer(fileContent);
      this.fileName = fileName;
      this.base64   = fileContent.toString('base64');
      this.mimetype = mimer(fileName);
      this.content  = uri({
        base64: this.base64,
        mimetype: this.mimetype
      });

      return this;
  }

  encode(fileName, handler) {
      this.async(fileName, function (err) {
          if (handler) {
              if (err) {
                  return handler(err);
              }

              handler.call(this, null, this.content, this);

              return;
          }

          if (err) {
              this.emit('error', err);

              return;
          }

          this.emit('encoded', this.content, this);
      });
  }

  encodeSync(fileName) {
      if (!fileName || !fileName.trim || fileName.trim() === '') {
          throw new Error('Insert a File path as string argument');
      }

      if (existsSync(fileName)) {
          var fileContent = fs.readFileSync(fileName);

          return this.format(fileName, fileContent).content;
      } else {
          throw new Error('The file ' + fileName + ' was not found!');
      }
  }

  async(fileName, handler) {
      var self = this;

      exists(fileName, function () {
          fs.readFile(fileName, function (err, fileContent) {
              if (err) {
                  return handler.call(self, err);
              }

              handler.call(self.format(fileName, fileContent));
          });
      });
  }

  getCSS(className) {

      if (!this.content) {
          throw new Error('Create a data-uri config using the method encodeSync');
      }

      className = className || path.basename(this.fileName, path.extname(this.fileName));

      return css({
          className: className,
          background: this.content
      });
  }
}

export default Api;
