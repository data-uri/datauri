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
        existsSync = fs.existsSync || path.existsSync,
        exists = fs.exists || path.exists;

    var DataURI = function (fileName) {
        if (!(this instanceof DataURI)) {
            return new DataURI(fileName);
        } else if (fileName) {
            return this.createConfig(fileName);
        }
    };
    
    DataURI.async = function(fileName, callback) {
        DataURI.asyncURI(fileName, function(err, uri) {
           if(err) return callback(err);
           callback(null, uri.content);
        });  
    };
    
    DataURI.asyncURI = function(fileName, callback) {
        exists(fileName, function(isExisting) {
            fs.readFile(fileName, 'base64', function(err, data) {
                if(err) return callback(err);
                var uri = new DataURI();
                uri.fileName = fileName;
                uri.base64 = data;
                uri.mimetype = mimer(fileName);
                uri.content = uri(uri);
                callback(null, uri);
            });
        });
    }

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
