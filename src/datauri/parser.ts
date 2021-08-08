import { promises } from 'fs';
import mimer from 'mimer';
import uri from './template/uriTemplate';
import { DataURI } from './types';

const { readFile } = promises;

class DataURIParser {
  fileName?: string;
  mimetype?: string;
  content?: string;
  base64?: string;
  buffer?: Buffer;

  async encode(fileName: string, handler?: DataURI.Callback): Promise<string | undefined> {
    try {
      const buffer = await readFile(fileName);

      this.format(fileName, buffer);
      handler && handler(undefined, this.content, this);

      return this.content;
    } catch (err) {
      if (handler) {
        handler(err);

        return;
      }

      throw err;
    }
  }

  format(fileName: string, fileContent: DataURI.Input): DataURIParser {
    const fileBuffer = fileContent instanceof Buffer ? fileContent : Buffer.from(fileContent);

    this.buffer = fileBuffer;
    this.base64 = fileBuffer.toString('base64');
    this.createMetadata(fileName);

    return this;
  }

  private createMetadata(fileName: string) {
    this.fileName = fileName;
    this.mimetype = mimer(fileName);
    this.content = uri(this);

    return this;
  }
}

export = DataURIParser;
