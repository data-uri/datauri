const { readFileSync, existsSync } = require('fs');
const format = require('./format');

module.exports = function encodeSync(fileName, cssConfig) {
  if (!fileName || fileName.trim() === '') {
    throw new Error('Insert a File path as string argument');
  }

  if (existsSync(fileName)) {
    const data = format(fileName, readFileSync(fileName));

    return !cssConfig ?
      data.content : data.css(((cssConfig instanceof Boolean) ? null : cssConfig ));
  }

  throw new Error(`The file ${fileName} was not found!`);
};
