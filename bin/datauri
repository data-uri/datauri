#!/usr/bin/env node
/*
 * datauri - A simple Data URI scheme generator
 * https://github.com/heldr/datauri
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
 */

var args = process.argv,
    fs   = require('fs'),
    path = require('path'),
    mime = require('./lib/mime'),
    uri  = require('./lib/uri'),
    css  = require('./lib/css');

function writeNewCssFile( file , content , action ) {
    fs.writeFile( file , content , 'utf-8' , function(err) {
        if(err) {
            throw err;
        }

        console.log('File ' + action + ': ' + file);
    });
}

function outputCSS( file , content ) {

    content = css({
        className: args[4] || path.basename( file , path.extname(file) ),
        background: content
    });

    if ( fs.existsSync(file) ) {

        if ( path.extname(file).match(/(css|sass|less)/) ) {
            fs.readFile( file , 'utf-8' , function( err , cssContent ) {

                cssContent += content;

                writeNewCssFile( file , cssContent , 'updated' );

            });
        } else {
            console.log( 'Must be a CSS file' );
        }


    } else {

        writeNewCssFile( file , content , 'created' );

    }
}

if (args.length > 2) {
    var fileName = args[2];

    if ( fs.existsSync( fileName ) ) {

        fs.readFile( fileName , 'base64' , function( err , content ) {
            if(err) {
                throw err;
            }

            try {

                content = uri({
                    mimetype: mime.getFromFile( fileName ),
                    base64: content
                });

                ( args.length < 4 ) ? console.log( content ) : outputCSS( args[3] , content );

            } catch(err) {
                throw err;
            }

        });

    }
}