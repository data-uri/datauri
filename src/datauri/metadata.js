const mimer = require('mimer');
const uri = require('./template/uri');

module.exports = (fileName, base64 = '') => Object({
  fileName,
  base64,
  get content() {
    return uri({ mimetype: mimer(fileName), base64 });
  },
  get mimetype() {
    return mimer(fileName);
  },

  // css is used in very few cases, do not require its dependencies out
  css(config = {}) {
    const getDimensions = require('image-size');
    const path = require('path');

    config.className =
      config.className || path.basename(this.fileName, path.extname(this.fileName));
    config.background = this.content;

    if (config.width || config.height || config['background-size']) {
      config.dimensions = getDimensions(this.fileName);
    }

    return require('./template/css')(config);
  }
});
