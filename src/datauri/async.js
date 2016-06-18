const Stream = require('stream');
const metadata = require('./metadata');

const stream = new Stream();
const propagateStream = chunk => stream.emit('data', chunk);

stream.readable = true;
exports.stream = stream;

const runCallback =
  (handler, err) => err ? handler(err) : handler.call(this, null, this.content, this);

function asyncEncode(fileName, handler) {
  const base64Chunks = [];

  propagateStream(metadata(fileName).content);
  stream.createReadStream(fileName, { encoding: 'base64' })
    .on('data', propagateStream)
    .on('data', chunk => base64Chunks.push(chunk))
    .on('error', err => (handler(err), this.emit('error', err)))
    .on('end', () => {
      const data = metadata(fileName, base64Chunks.join(''));
      stream.emit('end');
      handler(null, data);
      stream.emit('encoded', data.content, this);
    });
}

module.exports =
  (fileName, handler) =>
    asyncEncode(fileName, (err, data) => handler && runCallback(handler, err, data));
