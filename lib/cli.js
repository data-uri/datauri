/*
 * datauri - A simple Data URI scheme generator
 * https://github.com/heldr/datauri
 *
 * Copyright (c) 2013 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/datauri/master/MIT-LICENSE.txt
 */

(function (args) {
    "use strict";

    var fs      = require('fs'),
        path    = require('path'),
        DataURI = require('./exec');

    function writeNewCssFile(file, content, action) {
        fs.writeFile(file, content, 'utf-8', function (err) {
            if (err) {
                throw err;
            }

            console.log('File ' + action + ': ' + file);
        });
    }

    function outputCSS(file, content) {

        if (path.extname(file).match(/(css|sass|scss|styl|less)/)) {
            if (fs.existsSync(file)) {
                fs.readFile(file, 'utf-8', function (err, cssContent) {

                    cssContent += content;

                    writeNewCssFile(file, cssContent, 'updated');

                });
            } else {
                writeNewCssFile(file, content, 'created');
            }
        }  else {
            console.log('Your css file must have extension: .css, .sass, .scss, .styl or .less');
        }
    }

    if (args.length > 2) {

        var cls = args[4] || '',
            uri = new DataURI(args[2]),
            content;

        if (args.length < 4) {
            content = uri.content;
            console.log(content);
        } else {
            content = uri.getCss(cls);
            outputCSS(args[3], content);
        }

    } else {
        console.log('\nHow to use Data-uri client:\n\ndatauri <target_file>\ndatauri <target_file> <css_output>\ndatauri <target_file> <css_output> <css_class_name>\n');
    }

}(process.argv));
