const datauri = require('../../src/datauri');

describe.skip('async', () => {

  describe('running with callback function', () => {

    it('should run datauri as function with callback', done => {
      datauri(fixture, function(err, content, fullTree) {
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
      datauri('^&%76868', (err, content) => {
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

      datauri(fixture);
    });
  });
});

describe.skip('readable stream', () => {
  it('should run through events "data" and "end"', (done) => {
    let data = '';

    datauri
      .on('data', chunk => {
        data += chunk;
      })
      .on('end', () => {
        data.should.equal(expected.content);
        done();
      });

    datauri(fixture);
  });

  it('should run through pipe', done => {
    const ws = Writable();
    const content = [];

    ws._write = (chunk, enc, next) => {
      content.push(chunk);
      next();
    };

    datauri.pipe(ws);

    datauri.on('end', () => {
      content.join('').should.equal(expected.content);

      done();
    });

    datauri(fixture);

  });
});
