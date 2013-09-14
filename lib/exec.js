/*
 * datauri - A simple Data URI scheme generator
 * https://github.com/heldr/datauri
 *
 * Copyright (c) 2013 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
 */

module.exports = (function () {
    "use strict";

    var util       = require('util'),
        events     = require('events'),
        path       = require('path'),
        fs         = require('fs'),
        mimer      = require('mimer'),
        uri        = require('./uri'),
        css        = require('./css'),
        existsSync = fs.existsSync,
        exists     = fs.exists;

    var DataURI = function (fileName) {
        var dUri = null;

        events.EventEmitter.call(this);

        if (!(this instanceof DataURI)) {
            dUri = new DataURI();

            return (fileName) ? dUri.createConfig(fileName) : dUri;
        }

        if (fileName) {
            return this.createConfig(fileName);
        }

        return this;
    };

    util.inherits(DataURI, events.EventEmitter);

    DataURI.prototype.createConfig = function (fileName) {
        if (!fileName || !fileName.trim || fileName.trim() === '') {
            throw new Error('A string file path must be set as argument');
        }

        if (existsSync(fileName)) {
            this.fileName = fileName;
            this.base64   = fs.readFileSync(fileName, 'base64');
            this.mimetype = mimer(fileName);
            this.content  = uri(this);

            return this.content;
        } else {
            throw new Error('The file ' + fileName + ' was not found!');
        }

    };

    DataURI.prototype.getCss = function (className) {

        if (!this.content) {
            throw new Error('Create a data-uri config using the method createConfig');
        }

        className = className || path.basename(this.fileName, path.extname(this.fileName));

        return css({
            className: className,
            background: this.content
        });
    };

    DataURI.prototype.async = function (fileName, callback) {
        DataURI.asyncURI(fileName, function (err, uri) {
            if (err) {
                return callback(err);
            }

            callback(null, uri.content);
        });
    };

    DataURI.prototype.asyncURI = function (fileName, callback) {
        var self = this;
        exists(fileName, function () {
            fs.readFile(fileName, 'base64', function (err, data) {
                if (err) {
                    return callback(err);
                }

                self.fileName = fileName;
                self.base64 = data;
                self.mimetype = mimer(fileName);
                self.content = uri(self);
                callback(null, self);
            });
        });
    };

    return DataURI;

}).call(this);
