const asyncEncode = require('./async');

function datauri(fileName) {
  return new Promise((resolve, reject) => {
    asyncEncode.on('encoded', resolve)
      .on('error', reject)
      .encode(fileName);
  });
}

datauri.format = require('./format');
datauri.sync = require('./sync');

// ONLY exposes on, emit and pipe methods from Stream
// exports.on = asyncEncode.stream.on;
// exports.emit = asyncEncode.stream.emit;
// exports.pipe = asyncEncode.stream.pipe;

module.exports = datauri;
