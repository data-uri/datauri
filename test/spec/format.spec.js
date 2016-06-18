const datauri = require('../../src/datauri');
const format = require('../../src/datauri/format');

const testFactory = handler => () => {
  const data = handler('.png', 'xkcd');

  data.should.have.property('fileName', '.png');
  data.should.have.property('base64', 'eGtjZA==');
  data.mimetype.should.be.eql('image/png');
  data.content.should.be.eql('data:image/png;base64,eGtjZA==');
};

describe('#format', () => {
  it('datauri.format should work', testFactory(datauri.format));
  it('format should work', testFactory(format));
});
