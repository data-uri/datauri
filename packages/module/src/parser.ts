import mimer from "mimer";
import { readFile } from "node:fs/promises";
import type { DataURICallback, DataURIInput, DataURIMetaSchema } from "./types";

export class DataURIParser {
  private meta: DataURIMetaSchema = {
    fileName: undefined,
    mimetype: undefined,
    content: undefined,
    base64: undefined,
    buffer: undefined,
  };

  /**
   * Encodes a file into a Data URI format.
   * @param {string} fileName - The name of the file to encode.
   * @param {DataURICallback} [handler] - Optional callback to handle the result or error.
   * @returns {Promise<string | undefined>} - The encoded Data URI string or undefined if an error occurs.
   * @throws {Error} - Throws an error if the file cannot be read and no handler is provided.
   */
  async encode(
    fileName: string,
    handler?: DataURICallback,
  ): Promise<string | undefined> {
    try {
      const buffer = await readFile(fileName);

      this.format(fileName, buffer);
      const content = this.getMeta("content") as string;
      handler?.(undefined, content, this.getMeta());

      return content;
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
   * @param {keyof DataURIMetaSchema} [key] - Optional key to retrieve specific metadata (e.g., 'fileName').
   * @returns {DataURIMetaSchema | Buffer | string | undefined} - An object containing all metadata if no key is provided,
   * the value of the specified key if valid, or throws an error if the key does not exist.
   * @throws {Error} - Throws an error if an invalid metadata key is provided.
   */
  getMeta(): DataURIMetaSchema;
  getMeta(key: "buffer"): Buffer;
  getMeta<K extends Exclude<keyof DataURIMetaSchema, "buffer">>(
    key: K,
  ): DataURIMetaSchema[K];
  getMeta(key?: keyof DataURIMetaSchema) {
    if (!key) {
      return this.meta;
    }

    if (!(key in this.meta)) {
      throw new Error(`Invalid metadata key: ${key}`);
    }

    return this.meta[key as keyof DataURIMetaSchema];
  }

  private setMeta(key: "buffer", value: Buffer): DataURIParser;
  private setMeta<K extends Exclude<keyof DataURIMetaSchema, "buffer">>(
    key: K,
    value: string,
  ): DataURIParser;
  private setMeta(
    key: keyof DataURIMetaSchema,
    value: string | Buffer,
  ): DataURIParser {
    if (!key) {
      throw new Error("Key must be provided to set metadata.");
    }

    if (typeof value === "string" || value instanceof Buffer) {
      this.meta[key] = value as string & Buffer;
    } else {
      throw new Error("Value must be a string or Buffer.");
    }

    return this;
  }

  /**
   * Formats the file content into a Data URI format and updates the parser's metadata.
   * @param {string} fileName - The name of the file being formatted.
   * @param {DataURIInput} fileContent - The content of the file as a Buffer or string.
   * @returns {DataURIParser} - The current instance of the parser with updated metadata.
   */
  format(fileName: string, fileContent: DataURIInput): DataURIParser {
    const fileBuffer =
      fileContent instanceof Buffer ? fileContent : Buffer.from(fileContent);

    this.setMeta("buffer", fileBuffer);
    this.setMeta("base64", fileBuffer.toString("base64"));
    this.setMeta("fileName", fileName);
    this.setMeta("mimetype", mimer(fileName));
    this.setMeta(
      "content",
      `data:${this.getMeta("mimetype")};base64,${this.getMeta("base64")}`,
    );

    return this;
  }
}
