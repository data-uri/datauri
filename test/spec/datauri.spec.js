import semver from 'semver';
import sinon from 'sinon';
import { should as Should } from 'chai';
import * as cssExp from '../expected/css';
import fs from 'fs';
import { Writable } from 'stream';

// const DataURI = require(datauri_path)
const should = Should();
const nodeVersion = semver.clean(process.version);
const fixture    = 'test/fixture.gif';
const wrongFile  = 'PAPARIPUPI';
const expected   = {
  fileName: fixture,
  base64: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  mimetype: 'image/gif',
  content: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
};

describe.skip('Data-uri Module', () => {

  if (semver.satisfies(nodeVersion, '0.12.x || >= 4.0.0')) {
    describe('promise', () => {

      describe('running with then function', () => {
        it('should fulfill a promise', done => {
          let dPromises = DataURI.promise;
          let fulfill = sinon.spy();
          let reject = sinon.spy();

          dPromises(fixture).then(fulfill).catch(reject).then(() => {
            fulfill.calledOnce.should.be.ok;
            fulfill.calledWith(expected.content).should.be.ok;
            reject.callCount.should.equal(0);

            done();
          });
        });

        it('should reject a promise', done => {
          let dPromises = DataURI.promise;

          dPromises('^&%76868').catch((err) => {
            should.exist(err);
            done();
          });
        });
      });
    });
  }
});
