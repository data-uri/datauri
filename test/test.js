require('babel-core/register');
require('babel-polyfill');

const path = require('path');

if (process.env.NODE_ENV === 'test') {
  process.env.DATAURI_REQUIRE_PATH = path.join(process.cwd(), 'src/datauri/index.js');
}
