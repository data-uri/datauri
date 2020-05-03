import Api from "./parser";
import { ISize } from "image-size/dist/types/interface";

export namespace DataURI {

  export interface CSSConfig {
    width?: boolean;
    height?: boolean;
    "background-size"?: boolean;
    class?: string;
    dimensions?: ISize
  }

  export type Input = string | Buffer;

  export type Callback = (err?: Error, content?: string, instance?: Api) => any;
}
