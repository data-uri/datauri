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
    fs   = require('fs');

function outputFile( path ) {

}

if (args.length > 2) {
    var fileName = args[3];

    if ( fs.existsSync( fileName ) ) {

        fs.readFile( fileName , 'base64' , function( err , content ) {
            if(err) {
                throw err;
            }

            ( args.length > 3 ) ?console.log( '\n' + content );
            }
        });

    }
}