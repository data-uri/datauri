import type { DataURIMetaSchema, DataURIParser } from "datauri";
import { imageSize } from "image-size";
import type { ISize } from "image-size/dist/types/interface";
import path from "node:path";
import { cssParser } from "./template/cssTemplate";

const defaultCSSConfig = {};

function createClassName(fileName: string) {
  return path.basename(fileName, path.extname(fileName));
}

export interface DatauriCSSConfig {
  width?: boolean;
  height?: boolean;
  backgroundSize?: boolean;
  className?: string;
  dimensions?: ISize;
}

/**
 * Parses a Data URI and generates CSS based on the provided configuration.
 *
 * @param {DataURIParser} meta - An instance of DataURIParser containing the file and content to parse.
 * @param {DatauriCSSConfig} [config=defaultCSSConfig] - Configuration options for generating CSS.
 * @param {boolean} [config.width] - Whether to include the width of the image in the CSS.
 * @param {boolean} [config.height] - Whether to include the height of the image in the CSS.
 * @param {boolean} [config.backgroundSize] - Whether to include the background-size property in the CSS.
 * @param {string} [config.className] - Custom class name for the generated CSS.
 * @param {ISize} [config.dimensions] - Dimensions of the image (width and height).
 * @returns {Promise<string>} - A string containing the generated CSS.
 * @throws {Error} - Throws an error if the parser is not initialized with a valid file and content.
 */
export default async function DataURICSSParser(
  meta: DataURIMetaSchema,
  config: DatauriCSSConfig = defaultCSSConfig,
): Promise<string> {
  const cssConfig: DatauriCSSConfig = {
    ...defaultCSSConfig,
    ...config,
  };

  const { content, fileName, buffer } = meta;

  if (typeof content !== "string" || typeof fileName !== "string" || !buffer) {
    throw new Error(
      "DataURIParser must be initialized with a valid file and content.",
    );
  }

  if (
    (cssConfig.width || cssConfig.height || cssConfig.backgroundSize) &&
    buffer
  ) {
    cssConfig.dimensions = imageSize(buffer);
  }

  return cssParser({
    ...cssConfig,
    className: cssConfig.className ?? createClassName(fileName),
    background: content,
  });
}
