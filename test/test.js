require('babel-core/register')({
  "presets": ["stage-0", "es2015"]
});

var isProd = (process.env.NODE_ENV === 'production');

global.cli_cmd = isProd ? 'node lib/datauri-cli' : './node_modules/.bin/babel-node src/cli/module.js';
global.datauri_path = isProd ? '../../lib/datauri' : '../../src/datauri/module.js';
