/* eslint-disable @typescript-eslint/no-namespace */
import Api from './parser';
import { ISize } from 'image-size/dist/types/interface';

export namespace DataURI {
  export interface CSSConfig {
    width?: boolean;
    height?: boolean;
    backgroundSize?: boolean;
    className?: string;
    dimensions?: ISize;
  }

  export type Input = string | Buffer;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type Callback = (err?: Error, content?: string, instance?: Api) => any;
}
