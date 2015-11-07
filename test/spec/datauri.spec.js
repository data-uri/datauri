import semver from 'semver';
import sinon from 'sinon';
import { should as Should } from 'chai';
import * as cssExp from '../expected/css';

const DataURI = require(datauri_path)
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

let dUri, cssContent;

describe('Data-uri Module', () => {

  it('should format', () => {
    dUri = new DataURI();

    dUri.format('.png', 'xkcd');

    dUri.should.have.property('fileName', '.png');
    dUri.should.have.property('base64', 'eGtjZA==');
    dUri.should.have.property('mimetype', 'image/png');
    dUri.should.have.property('content', 'data:image/png;base64,eGtjZA==');
  });

  describe('sync', () => {

    describe('running without arguments', () => {

      beforeEach(() => {
        dUri = new DataURI();
      });

      after(() => {
        dUri = null;
      });

      it('should instance DataURI class', () => {
        dUri.should.be.an.instanceOf(DataURI)
      });

      describe('#encodeSync errors', () => {

        it('should throw error if a file name is not given', () => {
          let errorMsg = 'Insert a File path as string argument';
          let types = [null, '', ' ', {}, [], 8];

          types.forEach(type => (() => dUri.encodeSync(type)).should.throw(errorMsg));
        });

        it('should throw error if a specific file doesn\'t exist', () => {
          let expectedMsg = `The file ${wrongFile} was not found!`;

          (() => dUri.encodeSync(wrongFile)).should.throw(expectedMsg);
        });

        describe('#getCSS errors' , () => {
          it('should throw an error because a config is missing', () => {
            let errorMsg = 'Create a data-uri config using the method encodeSync';

            (() => dUri.getCSS()).should.throw(errorMsg);
          });
        });
      });

      describe('#encodeSync', () => {

        beforeEach(() => dUri.encodeSync(fixture));

        it('should have properties with datauri format splitted', () => {
          dUri.should.have.property('fileName', expected.fileName);
          dUri.should.have.property('base64', expected.base64);
          dUri.should.have.property('mimetype', expected.mimetype);
          dUri.should.have.property('content', expected.content);
        });


        describe('#getCSS' , () => {

          it('should create a class with datauri background using target file name', () => {
            dUri.getCSS().should.equal(cssExp.simple);
          });

          it('should create a class with datauri background using a defined name',
          () => {
            dUri.getCSS({class:'foobar'}).should.equal(cssExp.customName);
          });

          it('should create a class with datauri background with width', () => {
            dUri.getCSS({width:true}).should.equal(cssExp.width);
          });

          it('should create a class with datauri background with height', () => {
            dUri.getCSS({height:true}).should.equal(cssExp.height);
          });

          it('should create a class with datauri background with both width and height', () => {
            dUri.getCSS({width:true,height:true}).should.equal(cssExp.both);
          });

          it('should create a class with datauri background with background-size', () => {
            dUri.getCSS({"background-size":true}).should.equal(cssExp.bgsize);
          });
        });

      });
    });

    describe('running with arguments', () => {

      before(() => {
        dUri = new DataURI(fixture);
      });

      after(() => {
        dUri = null;
      });

      it('should instance DataURI class', () => dUri.should.be.an.instanceOf(DataURI));

      it('should have properties with datauri format splitted', () => {
        dUri.should.have.property('fileName', expected.fileName);
        dUri.should.have.property('base64', expected.base64);
        dUri.should.have.property('mimetype', expected.mimetype);
        dUri.should.have.property('content', expected.content);
      });

      it('should run datauri as function and return a string', () => {
        let dFunc = DataURI.sync(fixture);

        dFunc.should.equal(expected.content);
      });

      it('should throw an error if a specific file doesn\'t exist', () => {
        let expectedMsg = 'The file ' + wrongFile + ' was not found!';

        (() => new DataURI(wrongFile)).should.throw(expectedMsg);
        (() => DataURI.sync(wrongFile)).should.throw(expectedMsg);
      });

      describe('#getCSS' , () => {
        it('should create a class with datauri background using target file name', () => {
          dUri.getCSS().should.equal('\n.fixture {\n    background-image: url(\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');\n}');
        });

        it('should create a class with datauri background using a defined name', () => {
          dUri.getCSS({class:'foobar'}).should.equal('\n.foobar {\n    background-image: url(\'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');\n}');
        });

        it('should create a class with datauri background with width', () => {
          dUri.getCSS({width:true}).should.equal(cssExp.width);
        });

        it('should create a class with datauri background with height', () => {
          dUri.getCSS({height:true}).should.equal(cssExp.height);
        });

        it('should create a class with datauri background with both width and height', () => {
          dUri.getCSS({width:true,height:true}).should.equal(cssExp.both);
        });

        it('should create a class with datauri background with background-size', () => {
          dUri.getCSS({"background-size":true}).should.equal(cssExp.bgsize);
        });
      });
    });
  });

  describe('async', () => {

    beforeEach(() => {
        dUri = new DataURI();
    });

    describe('running with callback function', () => {

      it('should run datauri as function with callback', done => {
        dUri.encode(fixture, function(err, content, fullTree) {
          should.not.exist(err);
          content.should.equal(expected.content);

          this.should.have.property('fileName', expected.fileName);
          this.should.have.property('base64', expected.base64);
          this.should.have.property('mimetype', expected.mimetype);
          this.should.have.property('content', expected.content);

          fullTree.should.have.property('fileName', expected.fileName);
          fullTree.should.have.property('base64', expected.base64);
          fullTree.should.have.property('mimetype', expected.mimetype);
          fullTree.should.have.property('content', expected.content);

          done();
        });
      });

      it('should return error when a file does not exist', done => {
        dUri.encode('^&%76868', (err, content) => {
          should.exist(err);
          done();
        });
      });

    });

    describe('running with event', () => {

      it('should call event "encoded" when a datauri format is done', done => {
        dUri.on('encoded', function(content, fullTree) {
          content.should.equal(expected.content);

          this.should.have.property('fileName', expected.fileName);
          this.should.have.property('base64', expected.base64);
          this.should.have.property('mimetype', expected.mimetype);
          this.should.have.property('content', expected.content);

          fullTree.should.have.property('fileName', expected.fileName);
          fullTree.should.have.property('base64', expected.base64);
          fullTree.should.have.property('mimetype', expected.mimetype);
          fullTree.should.have.property('content', expected.content);

          done();
        });

        dUri.encode(fixture);
      });

      it('should chain methods and call event "encoded" when a datauri format is done', done => {
        dUri.on('encoded', function(content, fullTree) {
          content.should.equal(expected.content);

          this.should.have.property('fileName', expected.fileName);
          this.should.have.property('base64', expected.base64);
          this.should.have.property('mimetype', expected.mimetype);
          this.should.have.property('content', expected.content);

          fullTree.should.have.property('fileName', expected.fileName);
          fullTree.should.have.property('base64', expected.base64);
          fullTree.should.have.property('mimetype', expected.mimetype);
          fullTree.should.have.property('content', expected.content);

          done();
        }).encode(fixture);
      });


      it('should call event "error" when a file does not exist', done => {
        dUri = new DataURI();

        dUri.on('error', (err) => {
          should.exist(err);
          done();
        }).encode('^&%76868');
      });
    });
  });

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
