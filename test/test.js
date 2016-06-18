require('babel-core/register')({
  "presets": ["stage-0", "es2015"]
});
require('babel-polyfill');
require('chai').should();
