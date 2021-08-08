import DataURIParser from './parser';
import fs from 'fs';

function DataURISync(fileName: string): DataURIParser {
  if (!fileName || !fileName.trim || fileName.trim() === '') {
    throw new Error('Insert a File path as string argument');
  }

  const parser = new DataURIParser();

  if (fs.existsSync(fileName)) {
    const fileContent = fs.readFileSync(fileName);

    return parser.format(fileName, fileContent);
  }

  throw new Error(`The file ${fileName} was not found!`);
}

export = DataURISync;
