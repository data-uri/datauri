import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import DataURIASync from '../';
import { DataURIParser } from '../parser';

vi.mock('./parser');

describe('DataURIASync', () => {
  let mockEncode: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockEncode = vi.fn().mockResolvedValue('data:text/plain;base64,SGVsbG8=');
    DataURIParser.prototype.encode = mockEncode;
  });

  it('should call parser.encode with correct parameters', async () => {
    const fileName = 'test.txt';
    const handler = vi.fn();

    await DataURIASync(fileName, handler);

    expect(mockEncode).toHaveBeenCalledTimes(1);
    expect(mockEncode).toHaveBeenCalledWith(fileName, handler);
  });

  it('should call parser.encode without handler when not provided', async () => {
    const fileName = 'test.txt';

    await DataURIASync(fileName);

    expect(mockEncode).toHaveBeenCalledTimes(1);
    expect(mockEncode).toHaveBeenCalledWith(fileName, undefined);
  });

  it('should return the result from parser.encode', async () => {
    const fileName = 'test.txt';
    const expectedResult = 'data:text/plain;base64,SGVsbG8=';

    mockEncode.mockResolvedValue(expectedResult);

    const result = await DataURIASync(fileName);

    expect(result).toBe(expectedResult);
  });
});
