import fs from "node:fs";
import { DataURIParser } from "./parser";

/**
 * Converts a file into a Data URI format synchronously.
 *
 * @param {string} fileName - The path to the file to be converted.
 * @returns {DataURIParser} - An instance of DataURIParser containing the formatted Data URI.
 * @throws {Error} - Throws an error if the file path is invalid or the file does not exist.
 */
export default function DataURISync(fileName: string): DataURIParser {
	if (!fileName || !fileName.trim || fileName.trim() === "") {
		throw new Error("Insert a File path as string argument");
	}

	const parser = new DataURIParser();

	if (fs.existsSync(fileName)) {
		const fileContent = fs.readFileSync(fileName);

		return parser.format(fileName, fileContent);
	}

	throw new Error(`${fileName} was not found!`);
}
