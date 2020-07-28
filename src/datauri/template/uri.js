'use strict';

const path = require('path');

module.exports = data => {
  const fileName = path.basename(data.fileName);

  return `data:${data.mimetype};name=${encodeURIComponent(fileName)};base64,${data.base64 || ''}`;
};
