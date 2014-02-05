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
        RSVP       = require('rsvp'),
        uri        = require('./uri'),
        css        = require('./css'),
        existsSync = fs.existsSync,
        exists     = fs.exists;

    var DataURI = function (fileName, callback) {
        var dUri = null;

        events.EventEmitter.call(this);

        if (!(this instanceof DataURI)) {
            dUri = new DataURI();

            if (callback && typeof callback === 'function') {
                dUri.encode(fileName, callback);

                return;
            }

            return (fileName) ? dUri.createConfig(fileName) : dUri;
        }

        if (fileName) {
            return this.createConfig(fileName);
        }

        return this;
    };

    DataURI.promises = function (fileName) {
        var dUri = new DataURI(),
            promise = new RSVP.Promise(function (resolve, reject) {
                dUri.on('encoded', resolve)
                    .on('error', reject)
                    .encode(fileName);
            });

        return promise;
    };

    util.inherits(DataURI, events.EventEmitter);

    DataURI.prototype.createConfig = function (fileName) {
        if (!fileName || !fileName.trim || fileName.trim() === '') {
            throw new Error('Insert a File path as string argument');
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

    DataURI.prototype.encode = function (fileName, callback) {
        var self = this;

        this.asyncURI(fileName, function (err, uri) {
            if (callback) {
                if (err) {
                    return callback(err);
                }

                callback(null, uri.content, uri);

                return;
            }

            if (err) {
                self.emit('error', err);

                return;
            }

            self.emit('encoded', uri.content, uri);
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
