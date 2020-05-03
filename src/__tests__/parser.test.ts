import * as cssExp from './expected/css';
import path from 'path';
import DataURIParser from '../datauri/parser';

const fixture = path.resolve(__dirname, './fixtures/fixture.gif');
const expected = {
  fileName: fixture,
  base64: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  mimetype: 'image/gif',
  content: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
};

describe('Data-uri Parser', () => {

  it('should format', () => {
    const parser = new DataURIParser();

    parser.format('.png', 'xkcd');

    expect(parser).toHaveProperty('fileName', '.png');
    expect(parser).toHaveProperty('base64', 'eGtjZA==');
    expect(parser).toHaveProperty('mimetype', 'image/png');
    expect(parser).toHaveProperty('content', 'data:image/png;base64,eGtjZA==');
  });

  describe('async', () => {
    let parser: DataURIParser;

    beforeEach(() => {
      parser = new DataURIParser();
    });

    it('should run datauri as promise', async () => {
      const content = await parser.encode(fixture);

      expect(content).toBe(expected.content);
    });

    it('should run datauri as function with callback', done => {
      parser.encode(fixture, function (err, content, fullTree) {
        expect(err).toBeFalsy();
        expect(content).toBe(expected.content);

        expect(fullTree).toHaveProperty('fileName', expected.fileName);
        expect(fullTree).toHaveProperty('base64', expected.base64);
        expect(fullTree).toHaveProperty('mimetype', expected.mimetype);
        expect(fullTree).toHaveProperty('content', expected.content);

        done();
      });
    });
  });

  describe('#getCSS', () => {
    let meta: any;

    beforeEach((done) => {
      const parser = new DataURIParser();
      parser.encode(fixture, (err, content, instance) => {
        meta = instance;
        done();
      });
    });

    it('should create a class with datauri background using target file name', () => {
      expect(meta.getCSS()).toBe('\n.fixture {\n    background-image: url(\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');\n}');
    });

    it('should create a class with datauri background using a defined name', () => {
      expect(meta.getCSS({ class: 'foobar' })).toBe('\n.foobar {\n    background-image: url(\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');\n}');
    });

    it('should create a class with datauri background with width', () => {
      expect(meta.getCSS({ width: true })).toBe(cssExp.width);
    });

    it('should create a class with datauri background with height', () => {
      expect(meta.getCSS({ height: true })).toBe(cssExp.height);
    });

    it('should create a class with datauri background with both width and height', () => {
      expect(meta.getCSS({ width: true, height: true })).toBe(cssExp.both);
    });

    it('should create a class with datauri background with background-size', () => {
      expect(meta.getCSS({ "background-size": true })).toBe(cssExp.bgsize);
    });
  });
});
