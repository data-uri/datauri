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

  /**
   * Encodes a file into a Data URI format.
   * @param {string} fileName - The name of the file to encode.
   * @param {DataURICallback} [handler] - Optional callback to handle the result or error.
   * @returns {Promise<string | undefined>} - The encoded Data URI string or undefined if an error occurs.
   * @throws {Error} - Throws an error if the file cannot be read and no handler is provided.
   */
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

  /**
   * Retrieves metadata about the encoded Data URI.
   * @param {string} [key] - Optional key to retrieve specific metadata (e.g., 'fileName').
   * @returns {object | string | undefined} - An object containing all metadata, or the value of the specified key, or undefined if the key does not exist.
   */
  getMetadata(
    key?: string
  ): Pick<DataURIParser, 'fileName' | 'mimetype' | 'content' | 'base64'> | string | undefined {
    const metadata = {
      fileName: this.fileName,
      mimetype: this.mimetype,
      content: this.content,
      base64: this.base64
    };

    if (!key) {
      return metadata;
    }

    if (!(key in metadata)) {
      throw new Error(`Invalid metadata key: ${key}`);
    }

    return metadata[key as keyof typeof metadata];
  }

  /**
   * Formats the file content into a Data URI format and updates the parser's metadata.
   * @param {string} fileName - The name of the file being formatted.
   * @param {DataURIInput} fileContent - The content of the file as a Buffer or string.
   * @returns {DataURIParser} - The current instance of the parser with updated metadata.
   */
  format(fileName: string, fileContent: DataURIInput): DataURIParser {
    const fileBuffer = fileContent instanceof Buffer ? fileContent : Buffer.from(fileContent);

    this.buffer = fileBuffer;
    this.base64 = fileBuffer.toString('base64');
    this.createMetadata(fileName);

    return this;
  }

  /**
   * Creates metadata for the Data URI based on the file name and content.
   * @param {string} fileName - The name of the file being processed.
   * @returns {DataURIParser} - The current instance of the parser with updated metadata.
   * @private
   */
  private createMetadata(fileName: string) {
    const { base64, mimetype = mimer(fileName) } = this;

    this.fileName = fileName;
    this.mimetype = mimetype;
    this.content = uriParser({ base64, mimetype });

    return this;
  }
}
