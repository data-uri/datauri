/*
 * datauri - A simple Data URI scheme generator
 * https://github.com/heldr/datauri
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
 */

var _ = require('underscore');

var template = [
	"",
    ".<%= className %> {",
    "    background: url('<%= background %>')",
    "}"
].join('\n');

module.exports = _.template(template);