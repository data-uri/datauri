const { readFileSync, existsSync } = require('fs');
const format = require('./format');

const error = function (err) {
  throw new Error(err);
};

const getDataUri = f => format(f, readFileSync(f));

const validName =
  f => f && f.trim && f.trim().length ? f : error('Insert a File path as string argument');

const fileExist = f => existsSync(f) ? f : error(`The file ${f} was not found!`);

const checkCSS =
  (data, css) => !css ? data.content : data.css(((css instanceof Boolean) ? null : css ));

module.exports =
  (fileName, cssConfig) => checkCSS(getDataUri(fileExist(validName(fileName))), cssConfig);
