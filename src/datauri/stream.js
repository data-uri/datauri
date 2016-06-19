const Stream = require('stream');
const metadata = require('./metadata');

const factoryStream = () => new Stream();
const enableReadableStream = stream => (stream.readable = true);
const factoryDatauriStream = stream => fileName =>
  stream
    .emit('data', metadata(fileName).content)
    .createReadStream(fileName, { encoding: 'base64' });

module.exports = () => factoryDatauriStream(enableReadableStream(factoryStream()));
