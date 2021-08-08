import path from 'path';
import DataURICSSParser from '../datauri/css';

const fixture = path.resolve(__dirname, './fixtures/fixture.gif');

describe('Data-uri CSS Parser', () => {
  it('should create a class with datauri background using target file name', async () => {
    expect(await DataURICSSParser(fixture)).toMatchSnapshot();
  });

  it('should create a class with datauri background using a defined name', async () => {
    expect(await DataURICSSParser(fixture, { className: 'foobar' })).toMatchSnapshot();
  });

  it('should create a class with datauri background with width', async () => {
    expect(await DataURICSSParser(fixture, { width: true })).toMatchSnapshot();
  });

  it('should create a class with datauri background with height', async () => {
    expect(await DataURICSSParser(fixture, { height: true })).toMatchSnapshot();
  });

  it('should create a class with datauri background with both width and height', async () => {
    expect(await DataURICSSParser(fixture, { width: true, height: true })).toMatchSnapshot();
  });

  it('should create a class with datauri background with background-size', async () => {
    expect(await DataURICSSParser(fixture, { backgroundSize: true })).toMatchSnapshot();
  });
});
