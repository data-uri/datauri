import type { DataURIParser } from 'datauri';
import { imageSize } from 'image-size';
import type { ISize } from 'image-size/dist/types/interface';
import path from 'node:path';
import { cssParser } from './template/cssTemplate';

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

export async function DataURICSSParser(
  parser: DataURIParser,
  config: DatauriCSSConfig = defaultCSSConfig
): Promise<string> {
  const ast: DatauriCSSConfig = {
    ...defaultCSSConfig,
    ...config
  };
  if (ast.width || ast.height || ast.backgroundSize) {
    ast.dimensions = imageSize(parser.buffer);
  }

  return cssParser({
    ...ast,
    className: ast.className ?? createClassName(parser.fileName),
    background: parser.content
  });
}
