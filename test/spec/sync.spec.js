import { fixture, wrongFile, expected } from '../constants';
import * as cssExp from '../constants/css';
import { sync as datauriSync } from '../../src/datauri';

describe('sync', () => {
  describe('#sync errors', () => {
    it('should throw error if a file name is not given', () => {
      const errorMsg = 'Insert a File path as string argument';
      const types = [null, '', ' ', {}, [], 8];

      types.forEach(type => (() => datauriSync(type)).should.throw(errorMsg));
    });

    it('should throw error if a specific file doesn\'t exist', () => {
      let expectedMsg = `The file ${wrongFile} was not found!`;

      (() => datauriSync(wrongFile)).should.throw(expectedMsg);
    });
  });

  describe('#sync', () => {
    it('should have properties with datauri format splitted', () => {
      const uri = datauriSync(fixture);

      uri.should.be.eql(expected.content);
    });


    describe('#css', () => {
      it('should create a class with datauri background using target file name', () => {
        datauriSync(fixture, {}).should.equal(cssExp.simple);
      });

      it('should create a class with datauri background using a defined name', () => {
        datauriSync(fixture, { className: 'foobar' }).should.equal(cssExp.customName);
      });

      it('should create a class with datauri background with width', () => {
        datauriSync(fixture, { width: true }).should.equal(cssExp.width);
      });

      it('should create a class with datauri background with height', () => {
        datauriSync(fixture, { height: true }).should.equal(cssExp.height);
      });

      it('should create a class with datauri background with both width and height', () => {
        datauriSync(fixture, { width: true, height: true }).should.equal(cssExp.both);
      });

      it('should create a class with datauri background with background-size', () => {
        datauriSync(fixture, { 'background-size': true }).should.equal(cssExp.bgsize);
      });
    });
  });
});
