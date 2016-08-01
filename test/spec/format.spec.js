const datauri = require('../../src/datauri');
const format = require('../../src/datauri/format');

const testFactory = (handler, content) => () => {
  const data = handler('.png', content);

  data.should.have.property('fileName', '.png');
  data.should.have.property('base64', 'eGtjZA==');
  data.mimetype.should.be.eql('image/png');
  data.content.should.be.eql('data:image/png;base64,eGtjZA==');
};
const testStr = 'xkcd';
const testBuffer = new Buffer(testStr);

describe('#format', () => {
  describe('string', () =>{
    it('datauri.format should work', testFactory(datauri.format, testStr));
    it('format should work', testFactory(format, testStr));
  });

  describe('buffer', () =>{
    it('datauri.format should work', testFactory(datauri.format, testBuffer));
    it('format should work', testFactory(format, testBuffer));
  });
});
