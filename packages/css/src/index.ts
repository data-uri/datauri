import type { DataURIMetaSchema } from "datauri";
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
 * @param {DataURIMetaSchema} meta - Metadata schema containing the file name, content, and buffer of the Data URI.
 * @param {DatauriCSSConfig} [config=defaultCSSConfig] - Configuration options for generating CSS.
 * @param {boolean} [config.width] - If true, includes the width of the image in the generated CSS.
 * @param {boolean} [config.height] - If true, includes the height of the image in the generated CSS.
 * @param {boolean} [config.backgroundSize] - If true, includes the background-size property in the generated CSS.
 * @param {string} [config.className] - Specifies a custom class name for the generated CSS. Defaults to the file name without its extension.
 * @param {ISize} [config.dimensions] - Specifies the dimensions of the image (width and height). Automatically calculated if not provided and the buffer is available.
 * @returns {Promise<string>} - Resolves to a string containing the generated CSS.
 * @throws {Error} - Throws an error if the metadata schema does not contain valid file name, content, or buffer.
 */
export async function DataURICSSParser(
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
