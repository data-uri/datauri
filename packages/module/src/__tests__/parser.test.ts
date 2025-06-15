import { readFile } from "node:fs/promises";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DataURIParser } from "../parser";
import type { DataURIInput } from "../types";

vi.mock("node:fs/promises");

const mockReadFile = vi.mocked(readFile);

describe("DataURIParser", () => {
	let parser: DataURIParser;

	beforeEach(() => {
		parser = new DataURIParser();
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("encode", () => {
		it("should successfully encode a file and return data URI", async () => {
			const fileName = "test.txt";
			const fileBuffer = Buffer.from("Hello World");

			mockReadFile.mockResolvedValue(fileBuffer);

			const result = await parser.encode(fileName);

			expect(mockReadFile).toHaveBeenCalledWith(fileName);
			expect(result).toBeDefined();
			expect(result).toContain("data:text/plain;base64,");
			expect(parser.fileName).toBe(fileName);
			expect(parser.mimetype).toBe("text/plain");
			expect(parser.base64).toBe("SGVsbG8gV29ybGQ=");
			expect(parser.buffer).toEqual(fileBuffer);
		});

		it("should call handler with success when provided", async () => {
			const fileName = "test.txt";
			const fileBuffer = Buffer.from("Hello World");
			const handler = vi.fn();

			mockReadFile.mockResolvedValue(fileBuffer);

			const result = await parser.encode(fileName, handler);

			expect(handler).toHaveBeenCalledWith(
				undefined,
				expect.any(String),
				parser,
			);
			expect(result).toBeDefined();
			expect(result).toContain("data:text/plain;base64,");
		});

		it("should throw error when readFile fails and no handler provided", async () => {
			const fileName = "nonexistent.txt";
			const error = new Error("File not found");

			mockReadFile.mockRejectedValue(error);

			await expect(parser.encode(fileName)).rejects.toThrow("File not found");
		});

		it("should call handler with error when readFile fails and handler provided", async () => {
			const fileName = "nonexistent.txt";
			const error = new Error("File not found");
			const handler = vi.fn();

			mockReadFile.mockRejectedValue(error);

			const result = await parser.encode(fileName, handler);

			expect(handler).toHaveBeenCalledWith(error);
			expect(result).toBeUndefined();
		});
	});

	describe("getMetadata", () => {
		it("should return metadata object with current values", () => {
			parser.fileName = "test.txt";
			parser.mimetype = "text/plain";
			parser.content = "data:text/plain;base64,SGVsbG8gV29ybGQ=";
			parser.base64 = "SGVsbG8gV29ybGQ=";

			const metadata = parser.getMetadata();

			expect(metadata).toEqual({
				fileName: "test.txt",
				mimetype: "text/plain",
				content: "data:text/plain;base64,SGVsbG8gV29ybGQ=",
				base64: "SGVsbG8gV29ybGQ=",
			});
		});

		it("should return metadata with undefined values when not set", () => {
			const metadata = parser.getMetadata();

			expect(metadata).toEqual({
				fileName: undefined,
				mimetype: undefined,
				content: undefined,
				base64: undefined,
			});
		});

		it("should return only the fileName when requested", () => {
			parser.fileName = "test.txt";
			parser.mimetype = "text/plain";
			parser.content = "data:text/plain;base64,SGVsbG8gV29ybGQ=";
			parser.base64 = "SGVsbG8gV29ybGQ=";

			const fileNameMetadata = parser.getMetadata("fileName");
			const mimetypeMetadata = parser.getMetadata("mimetype");
			const contentMetadata = parser.getMetadata("content");
			const base64Metadata = parser.getMetadata("base64");

			expect(fileNameMetadata).toBe(parser.fileName);
			expect(mimetypeMetadata).toBe(parser.mimetype);
			expect(contentMetadata).toBe(parser.content);
			expect(base64Metadata).toBe(parser.base64);
		});

		it("should return undefined for a specific key when not set", () => {
			const fileNameMetadata = parser.getMetadata("fileName");

			expect(fileNameMetadata).toBeUndefined();
		});

		it("should throw an error for invalid key", () => {
			expect(() => parser.getMetadata("invalidKey")).toThrow(
				"Invalid metadata key: invalidKey",
			);
		});
	});

	describe("format", () => {
		it("should format with Buffer input", () => {
			const fileName = "test.txt";
			const fileBuffer = Buffer.from("Hello World");
			const result = parser.format(fileName, fileBuffer);

			expect(result).toBe(parser);
			expect(parser.buffer).toEqual(fileBuffer);
			expect(parser.base64).toBe("SGVsbG8gV29ybGQ=");
			expect(parser.fileName).toBe(fileName);
			expect(parser.mimetype).toBe("text/plain");
			expect(parser.content).toBeDefined();
			expect(parser.content).toContain("data:text/plain;base64,");
			expect(parser.content).toContain("SGVsbG8gV29ybGQ=");
		});

		it("should format with string input", () => {
			const fileName = "test.txt";
			const fileContent = "Hello World";
			const result = parser.format(fileName, fileContent);

			expect(result).toBe(parser);
			expect(parser.buffer).toEqual(Buffer.from(fileContent));
			expect(parser.base64).toBe("SGVsbG8gV29ybGQ=");
			expect(parser.fileName).toBe(fileName);
			expect(parser.mimetype).toBe("text/plain");
			expect(parser.content).toBeDefined();
			expect(parser.content).toContain("data:text/plain;base64,");
		});

		it("should format with Uint8Array input", () => {
			const fileName = "test.txt";
			const fileContent = new Uint8Array([
				72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100,
			]);
			const result = parser.format(fileName, fileContent as DataURIInput);

			expect(result).toBe(parser);
			expect(parser.buffer).toEqual(Buffer.from(fileContent));
			expect(parser.base64).toBe("SGVsbG8gV29ybGQ=");
			expect(parser.fileName).toBe(fileName);
			expect(parser.mimetype).toBe("text/plain");
			expect(parser.content).toBeDefined();
			expect(parser.content).toContain("data:text/plain;base64,");
		});

		it("should handle different file types correctly", () => {
			const fileName = "image.png";
			const fileBuffer = Buffer.from("fake-png-data");
			parser.format(fileName, fileBuffer);

			expect(parser.mimetype).toBe("image/png");
			expect(parser.content).toContain("data:image/png;base64,");
			expect(parser.content).toContain("ZmFrZS1wbmctZGF0YQ==");
		});
	});

	describe("createMetadata (private method behavior)", () => {
		it("should use mimer to determine mimetype when not provided", () => {
			const fileName = "test.jpg";
			const fileBuffer = Buffer.from("fake-image-data");

			parser.format(fileName, fileBuffer);

			expect(parser.mimetype).toBe("image/jpeg");
			expect(parser.content).toContain("data:image/jpeg;base64,");
		});
	});

	describe("integration scenarios", () => {
		it("should handle empty file", async () => {
			const fileName = "empty.txt";
			const emptyBuffer = Buffer.alloc(0);

			mockReadFile.mockResolvedValue(emptyBuffer);

			const result = await parser.encode(fileName);

			expect(result).toContain("data:text/plain;base64,");
			expect(parser.base64).toBe("");
		});

		it("should handle binary file", async () => {
			const fileName = "test.bin";
			const binaryBuffer = Buffer.from([0x00, 0x01, 0x02, 0xff]);

			mockReadFile.mockResolvedValue(binaryBuffer);

			const result = await parser.encode(fileName);

			expect(result).toContain("data:application/octet-stream;base64,");
			expect(parser.base64).toBe("AAEC/w==");
		});
	});
});
