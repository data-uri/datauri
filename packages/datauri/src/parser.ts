import mimer from 'mimer';
import { readFile } from 'node:fs/promises';
import { uriParser } from './template/uriTemplate';
import type { DataURICallback, DataURIInput } from './types';

export class DataURIParser {
  fileName?: string;
  mimetype?: string;
  content?: string;
  base64?: string;
  buffer?: Buffer;

  async encode(fileName: string, handler?: DataURICallback): Promise<string | undefined> {
    try {
      const buffer = await readFile(fileName);

      this.format(fileName, buffer);
      handler?.(undefined, this.content, this);

      return this.content;
    } catch (err) {
      if (handler) {
        handler(err as Error);

        return;
      }

      throw err;
    }
  }

  getMetadata(): { fileName?: string; mimetype?: string; content?: string; base64?: string } {
    return {
      fileName: this.fileName,
      mimetype: this.mimetype,
      content: this.content,
      base64: this.base64
    };
  }

  format(fileName: string, fileContent: DataURIInput): DataURIParser {
    const fileBuffer = fileContent instanceof Buffer ? fileContent : Buffer.from(fileContent);

    this.buffer = fileBuffer;
    this.base64 = fileBuffer.toString('base64');
    this.createMetadata(fileName);

    return this;
  }

  private createMetadata(fileName: string) {
    const { base64, mimetype = mimer(fileName) } = this;

    this.fileName = fileName;
    this.mimetype = mimetype;
    this.content = uriParser({ base64, mimetype });

    return this;
  }
}
