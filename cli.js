/*
 * datauri - A simple Data URI scheme generator
 * https://github.com/heldr/datauri
 *
 * Copyright (c) 2012 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
 */

var args    = process.argv,
    fs      = require('fs'),
    path    = require('path'),
    DataURI = require('./datauri');

function writeNewCssFile( file , content , action ) {
    fs.writeFile( file , content , 'utf-8' , function(err) {
        if(err) {
            throw err;
        }

        console.log('File ' + action + ': ' + file);
    });
}

function outputCSS( file , content ) {

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

    var cls = args[4] || '',
        uri = new DataURI( args[2] );

    ( args.length < 4 ) ? console.log( uri.content ) : outputCSS( args[3] , uri.getCss( cls ) );

}