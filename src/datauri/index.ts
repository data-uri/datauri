import DataURIParser from "./parser";
import { DataURI } from "./types";

function DataURIASync(fileName: string, handler?: DataURI.Callback) {
  const parser = new DataURIParser();

  return parser.encode(fileName, handler);
}

export = DataURIASync;
