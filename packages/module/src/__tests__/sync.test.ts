import fs from 'node:fs';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { DataURIParser } from '../parser';
import DataURISync from '../sync';

vi.mock('node:fs');
const mockedFs = vi.mocked(fs);

vi.mock('./parser');

describe('DataURISync', () => {
  let mockFormat: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockFormat = vi.fn().mockResolvedValue('data:text/plain;base64,SGVsbG8=');
    DataURIParser.prototype.format = mockFormat;
  });

  it('should throw error when file does not exist', () => {
    const fileName = 'non-existent-file.txt';
    mockedFs.existsSync.mockReturnValue(false);

    expect(() => DataURISync(fileName)).toThrow(`${fileName} was not found!`);
    expect(mockedFs.existsSync).toHaveBeenCalledWith(fileName);
    expect(mockedFs.readFileSync).not.toHaveBeenCalled();
    expect(mockFormat).not.toHaveBeenCalled();
  });

  it('should call parser.format with correct parameters when file exists', () => {
    const fileName = 'existing-file.txt';
    const fileContent = Buffer.from('test content');
    const expectedResult = { dataURI: 'data:text/plain;base64,dGVzdCBjb250ZW50' };

    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(fileContent);
    mockFormat.mockReturnValue(expectedResult);

    const result = DataURISync(fileName);

    expect(mockedFs.existsSync).toHaveBeenCalledWith(fileName);
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(fileName);
    expect(mockFormat).toHaveBeenCalledWith(fileName, fileContent);
    expect(result).toBe(expectedResult);
  });
});
