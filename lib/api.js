/*
 * datauri - A simple Data URI scheme generator
 * https://github.com/heldr/datauri
 *
 * Copyright (c) 2014 Helder Santana
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
        uri        = require('./template/uri'),
        css        = require('./template/css'),
        existsSync = fs.existsSync,
        exists     = fs.exists;

    var DataURI = function (fileName, handler) {
        var dUri = null;

        events.EventEmitter.call(this);

        if (!(this instanceof DataURI)) {
            dUri = new DataURI();

            if (handler && typeof handler === 'function') {
                dUri.encode(fileName, handler);

                return;
            }

            return (fileName) ? dUri.encodeSync(fileName) : dUri;
        }

        if (fileName) {
            return this.encodeSync(fileName);
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

    DataURI.prototype.format = function (fileName, fileContent) {
        this.fileName = fileName;
        this.base64   = new Buffer(fileContent).toString('base64');
        this.mimetype = mimer(fileName);
        this.content  = uri.call(this);

        return this;
    };

    DataURI.prototype.encode = function (fileName, handler) {
        this.async(fileName, function (err) {
            if (handler) {
                if (err) {
                    return handler(err);
                }

                handler(null, this.content, this);

                return;
            }

            if (err) {
                this.emit('error', err);

                return;
            }

            this.emit('encoded', this.content, this);
        });
    };

    DataURI.prototype.encodeSync = function (fileName) {
        if (!fileName || !fileName.trim || fileName.trim() === '') {
            throw new Error('Insert a File path as string argument');
        }

        if (existsSync(fileName)) {
            var fileContent = fs.readFileSync(fileName, 'utf-8');

            return this.format(fileName, fileContent).content;
        } else {
            throw new Error('The file ' + fileName + ' was not found!');
        }

    };

    DataURI.prototype.async = function (fileName, handler) {
        var self = this;

        exists(fileName, function () {
            fs.readFile(fileName, 'utf-8', function (err, fileContent) {
                if (err) {
                    return handler.call(self, err);
                }

                handler.call(self.format(fileName, fileContent));
            });
        });
    };

    DataURI.prototype.getCss = function (className) {

        if (!this.content) {
            throw new Error('Create a data-uri config using the method encodeSync');
        }

        className = className || path.basename(this.fileName, path.extname(this.fileName));

        return css.call({
            className: className,
            background: this.content
        });
    };

    return DataURI;

}).call(this);
