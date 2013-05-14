/*
 * datauri - A simple Data URI scheme generator
 * https://github.com/heldr/datauri
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
 */

module.exports = (function () {
    "use strict";

    var path = require('path'),
        fs   = require('fs'),
        mimer = require('mimer'),
        uri  = require('./uri'),
        css  = require('./css'),
        existsSync = fs.existsSync || path.existsSync;

    var DataURI = function (fileName) {
        if (!(this instanceof DataURI)) {
            if (fileName) {
                var dUri = new DataURI();

                return dUri.createConfig(fileName);
            }
            return new DataURI();
        }

        if (fileName) {
            return this.createConfig(fileName);
        }
    };

    DataURI.prototype.createConfig = function (fileName) {

        if (existsSync(fileName)) {
            this.fileName = fileName;
            this.base64   = fs.readFileSync(fileName, 'base64');
            this.mimetype = mimer(fileName);
            this.content  = uri(this);
        }

        return this.content;

    };

    DataURI.prototype.getCss = function (className) {

        return css({
            className: className || path.basename(this.fileName, path.extname(this.fileName)),
            background: this.content
        });
    };

    return DataURI;

}).call(this);
