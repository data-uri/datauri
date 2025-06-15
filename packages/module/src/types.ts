import type { DataURIParser as Api } from './parser';
export type DataURIInput = string | Buffer;
export type DataURICallback = (err?: Error, content?: string, instance?: Api) => void;
