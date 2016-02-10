require('babel-core/register')({
  "presets": ["stage-0", "es2015"]
});
require('babel-polyfill');

var path = require('path');

var isProd = (process.env.NODE_ENV === 'production');

global.cli_cmd = isProd ? 'node lib/datauri-cli' : './node_modules/.bin/babel-node --presets es2015 src/cli/module.js';
global.datauri_path = isProd ? '../../lib/datauri' : '../../src/datauri/module.js';

if (isProd) {
  process.env.DATAURI_N= process.cwd() + '/lib/datauri/index.js';
}
