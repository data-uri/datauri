import type { DataURIParser } from 'datauri';
import { beforeEach, describe, expect, it } from 'vitest';
import DataURICSSParser from '../';

describe('DataURICSSParser', () => {
  let mockImageBuffer: Buffer;
  let mockParser: DataURIParser;

  beforeEach(() => {
    // Create a real image buffer for testing (2x2 PNG)
    mockImageBuffer = Buffer.from([
      137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 2, 0, 0, 0, 2, 8, 6, 0,
      0, 0, 115, 122, 122, 122, 0, 0, 0, 9, 112, 72, 89, 115, 0, 0, 7, 224, 0, 0, 7, 224, 1, -64,
      -64, -64
    ]);

    mockParser = {
      buffer: mockImageBuffer,
      fileName: 'test-icon.png',
      content:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAADh0RVh0U29mdHdhcmUAbWF0cGxvdGxpYiB2ZXJzaW9uMy4yLjIsIGh0dHA6Ly9tYXRwbG90bGliLm9yZy+WH4yJAAABjUlEQVR42mJ8//8/AzD/'
    } as unknown as DataURIParser;
  });

  it('should generate CSS with default config', async () => {
    const result = await DataURICSSParser(mockParser);
    expect(result).toMatchSnapshot();
  });

  it('should use custom className when provided', async () => {
    const config = { className: 'my-custom-icon' };
    const result = await DataURICSSParser(mockParser, config);
    expect(result).toMatchSnapshot();
  });

  it('should include dimensions when width flag is true', async () => {
    const config = { width: true };
    const result = await DataURICSSParser(mockParser, config);
    expect(result).toMatchSnapshot();
  });

  it('should include dimensions when height flag is true', async () => {
    const config = { height: true };
    const result = await DataURICSSParser(mockParser, config);
    expect(result).toMatchSnapshot();
  });

  it('should include dimensions when width and height flags are true', async () => {
    const config = { width: true, height: true };
    const result = await DataURICSSParser(mockParser, config);
    expect(result).toMatchSnapshot();
  });

  it('should include background-size when backgroundSize flag is true', async () => {
    const config = { backgroundSize: true };
    const result = await DataURICSSParser(mockParser, config);
    expect(result).toMatchSnapshot();
  });

  it('should generate className from fileName without extension', async () => {
    const parserWithComplexName = {
      ...mockParser,
      fileName: 'my-awesome-icon.complex.name.svg'
    } as unknown as DataURIParser;

    const result = await DataURICSSParser(parserWithComplexName);
    expect(result).toMatchSnapshot();
  });

  it('should handle config with all options enabled', async () => {
    const config = {
      width: true,
      height: true,
      backgroundSize: true,
      className: 'full-featured-icon'
    };

    const result = await DataURICSSParser(mockParser, config);
    expect(result).toMatchSnapshot();
  });

  it('should work without config parameter', async () => {
    const result = await DataURICSSParser(mockParser);
    expect(result).toMatchSnapshot();
  });

  it('should handle different file extensions', async () => {
    const svgParser = {
      ...mockParser,
      fileName: 'icon.svg',
      content: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIj48L3N2Zz4='
    } as unknown as DataURIParser;

    const result = await DataURICSSParser(svgParser);
    expect(result).toMatchSnapshot();
  });

  // Keep error tests as they are since we're testing error messages
  it('should throw error when parser buffer is missing', async () => {
    const invalidParser = {
      ...mockParser,
      buffer: null
    } as unknown as DataURIParser;

    await expect(DataURICSSParser(invalidParser)).rejects.toThrow(
      'DataURIParser must be initialized with a valid file and content.'
    );
  });

  it('should throw error when parser fileName is missing', async () => {
    const invalidParser = {
      ...mockParser,
      fileName: null
    } as unknown as DataURIParser;

    await expect(DataURICSSParser(invalidParser)).rejects.toThrow(
      'DataURIParser must be initialized with a valid file and content.'
    );
  });

  it('should throw error when parser content is missing', async () => {
    const invalidParser = {
      ...mockParser,
      content: null
    } as unknown as DataURIParser;

    await expect(DataURICSSParser(invalidParser)).rejects.toThrow(
      'DataURIParser must be initialized with a valid file and content.'
    );
  });
});
