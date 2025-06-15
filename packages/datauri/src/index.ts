import { DataURIParser } from './parser';
import type { DataURICallback } from './types';

export default function DataURIASync(
  fileName: string,
  handler?: DataURICallback
): Promise<string | undefined> {
  const parser = new DataURIParser();

  return parser.encode(fileName, handler);
}

export { DataURIParser } from './parser';
export type * from './types';
