const stream = require('./stream');

module.exports = function datauriModule(fileName, handler) {
  const datauri = stream();
  const datauriChunks = [];

  datauri
    .on('data', datauriChunks.push)
    .on('end', () => datauri.emit('encoded', datauriChunks.join('')))
    // pub main events
    .on('error', err => this.emit('err', err))
    .on('encoded', data => this.emit('encoded', data));

  return new Promise((resolve, reject) => {
    datauri(fileName)
      .on('error', (handler || reject))
      .on('encoded', data => (handler && handler(null, data) || resolve(data)));
  });
};
