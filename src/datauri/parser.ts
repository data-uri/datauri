import path from 'path';
import fs from 'fs';
import util from 'util';
import mimer from 'mimer';
import { imageSize } from 'image-size';
import uri from './template/uri';
import css from './template/css';
import { DataURI } from "./types";

const defaultCSSConfig = {};
const readFile = util.promisify(fs.readFile)

class DataURIParser {
  fileName?: string;
  mimetype?: string;
  content?: string;
  base64?: string;

  async encode(fileName: string, handler?: DataURI.Callback): Promise<string | undefined> {
    try {
      this.base64 = await readFile(fileName, { 'encoding': 'base64' });

      this.createMetadata(fileName);

      handler && handler(undefined, this.content!, this);

      return this.content!;
    } catch (err) {
      if (handler) {
        handler(err);

        return;
      }

      throw err;
    }
  }

  format(fileName: string, fileContent: DataURI.Input) {
    const fileBuffer = (fileContent instanceof Buffer) ? fileContent : Buffer.from(fileContent);

    this.base64 = fileBuffer.toString('base64');
    this.createMetadata(fileName);

    return this;
  }

  getCSS(config: DataURI.CSSConfig = defaultCSSConfig) {
    config = config || {};

    if (!this.content || !this.fileName) {
      throw new Error('Create a data-uri config using the method encodeSync');
    }

    config.class = config.class || path.basename(this.fileName, path.extname(this.fileName));

    if (config.width || config.height || config['background-size']) {
      config.dimensions = imageSize(this.fileName);
    }

    return css({
      ...config,
      background: this.content
    });
  }

  private createMetadata(fileName: string) {
    this.fileName = fileName;
    this.mimetype = mimer(fileName);
    this.content = uri(this);

    return this;
  }
}

export = DataURIParser;
