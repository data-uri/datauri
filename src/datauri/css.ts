import DataURIParser from './parser';
import { DataURI } from './types';
import { imageSize } from 'image-size';
import { cssParser } from './template/cssTemplate';
import path from 'path';

const defaultCSSConfig = {};

function createClassName(fileName: string) {
  return path.basename(fileName, path.extname(fileName));
}

async function DataURICSSParser(
  filePath: string,
  config: DataURI.CSSConfig = defaultCSSConfig
): Promise<string> {
  const parser = new DataURIParser();

  const background = await parser.encode(filePath);

  const ast: DataURI.CSSConfig = {
    ...defaultCSSConfig,
    ...config
  };

  if (!background || !parser.fileName || !parser.buffer) {
    throw `Unabled to read file ${filePath}`;
  }

  if (ast.width || ast.height || ast.backgroundSize) {
    ast.dimensions = imageSize(parser.buffer);
  }

  return cssParser({
    ...ast,
    className: ast.className ?? createClassName(parser.fileName),
    background
  });
}

export = DataURICSSParser;
