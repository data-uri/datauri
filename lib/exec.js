/*
 * datauri - A simple Data URI scheme generator
 * https://github.com/heldr/datauri
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
 */

var path = require('path'),
    fs   = require('fs'),
    mime = require('./mime'),
    uri  = require('./uri'),
    css  = require('./css');


function dataURI( fileName , cb ) {

    var self = this,
        existsSync = fs.existsSync || path.existsSync;

    if ( existsSync( fileName ) ) {

        this.fileName = fileName;
        this.base64   = fs.readFileSync( fileName , 'base64' );
        this.mimetype = mime.getFromFile( fileName );
        this.content  = uri( this );

    }

}

dataURI.prototype = {
    getCss: function( className ) {
        return css({
            className: className || path.basename( this.fileName , path.extname( this.fileName ) ),
            background: this.content
        });
    }
};

module.exports = dataURI;