import { DataURIParser } from "./parser";
import type { DataURICallback } from "./types";

/**
 * Converts a file into a Data URI asynchronously.
 *
 * @param {string} fileName - The name of the file to be converted.
 * @param {DataURICallback} [handler] - Optional callback to handle the encoded Data URI.
 * @returns {Promise<string | undefined>} A promise that resolves to the encoded Data URI string, or undefined if an error occurs.
 */
export default function DataURIASync(
  fileName: string,
  handler?: DataURICallback,
): Promise<string | undefined> {
  const parser = new DataURIParser();

  return parser.encode(fileName, handler);
}

export type * from "./types";
