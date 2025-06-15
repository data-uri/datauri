import { DataURIParser } from './parser';
import type { DataURICallback } from './types';

export function DataURIASync(
  fileName: string,
  handler?: DataURICallback
): Promise<string | undefined> {
  const parser = new DataURIParser();

  return parser.encode(fileName, handler);
}

export type * from './types';
