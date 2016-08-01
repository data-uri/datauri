const metadata = require('./metadata');

const fileBuffer =
  fileContent => (fileContent instanceof Buffer) ? fileContent : new Buffer(fileContent);

module.exports =
  (fileName, fileContent) => metadata(fileName, fileBuffer(fileContent).toString('base64'));
