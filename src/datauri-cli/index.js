#!/usr/bin/env node
'use strict';
const minimist = require('minimist');
const cli = require('./cli');
const flags = minimist(process.argv.slice(2));

if (flags.hasOwnProperty('_') && flags._.length) {
  cli(flags);
} else {
  console.log([
    '\nData-uri usage:',
    '\ndatauri <target_file>',
    'datauri <target_file> --css',
    'datauri <target_file> --copy',
    'datauri <target_file> --css --copy',
    'datauri <target_file> --css=<css_output>',
    'datauri <target_file> --css=<css_output> --class=<css_class_name>',
    'datauri <target_file> --css=<css_output> --class=<css_class_name> --width --height',
    'datauri <target_file> --css=<css_output> --class=<css_class_name> --background-size'
  ].join('\n'));
}
