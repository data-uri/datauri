var DataURI = require("../lib/exec.js"),
    assert  = require("assert"),
    _       = require("lodash"),
    uri,
    cases   = {
        "should instance DataURI object" : function() {
            uri = new DataURI('./test/case.txt');
        },
        "should exist base64 param" : function() {
            assert.strictEqual( uri.base64 , "Zm9vIGJhcgo=");
        },
        "should the right mimetype" : function() {
            assert.strictEqual( uri.mimetype , "text/plain");
        },
        "should have the correct datauri format" : function() {
            assert.strictEqual( uri.content , "data:text/plain;base64,Zm9vIGJhcgo=");
        },
        "should return a css with Class Name equal filename" : function() {
            assert.strictEqual( uri.getCss() , "\n.case {\n    background: url('data:text/plain;base64,Zm9vIGJhcgo=')\n}");
        },
        "should return a css with Class Name defined by user" : function() {
            assert.strictEqual( uri.getCss("foobar") , "\n.foobar {\n    background: url('data:text/plain;base64,Zm9vIGJhcgo=')\n}");
        }
    };

var pairs = _.pairs(cases), last = _.last(pairs);

_.each( pairs , function (test_case) {

    console.log( '\n - ' + test_case[0] );
    test_case[1]();
    console.log(' - done!');

    if( test_case === last ) {
        console.log( '\n All specs working :D \n' );
    }

});