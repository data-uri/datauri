#!/usr/bin/env node

// ./lib versions lower than Node 6
var datauri = (parseInt(process.version.charAt(1)) < 6) ? './src' : './lib';

module.exports = require(datauri);
