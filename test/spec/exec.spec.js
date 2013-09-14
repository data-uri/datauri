describe('DataURI Class', function () {
    'use strict';

    var should    = require('chai').should(),
        DataURI   = require('../../lib/exec'),
        fixture   = 'test/fixture.txt',
        wrongFile = 'PAPARIPUPI',
        dUri, cssContent;

    describe('running sync without arguments', function () {

        beforeEach(function () {
            dUri = new DataURI();
        });

        after(function () {
            dUri = null;
        });

        it('should instance DataURI class', function () {
            dUri.should.be.an.instanceOf(DataURI)
        });

        describe('#createConfig errors', function () {

            it('should throw error if a file name is not given', function () {
                var errorMsg = 'A string file path must be set as argument';

                (function () {
                    dUri.createConfig();
                }).should.throw(errorMsg);
                (function () {
                    dUri.createConfig('');
                }).should.throw(errorMsg);
                (function () {
                    dUri.createConfig(' ');
                }).should.throw(errorMsg);
                (function () {
                    dUri.createConfig({});
                }).should.throw(errorMsg);
                (function () {
                    dUri.createConfig([]);
                }).should.throw(errorMsg);
                (function () {
                    dUri.createConfig(88);
                }).should.throw(errorMsg);
            });

            it('should throw error if a specific file doesn\'t exist', function () {
                var expectedMsg = 'The file ' + wrongFile + ' was not found!';

                (function () {
                    dUri.createConfig(wrongFile);
                }).should.throw(expectedMsg);
            });

            describe('#getCss errors' , function () {
                it('should throw an error because a config is missing', function () {
                    (function () {
                        dUri.getCss();
                    }).should.throw('Create a data-uri config using the method createConfig');
                });
            });
        });

        describe('#createConfig', function () {

            beforeEach(function () {
                dUri.createConfig(fixture);
            });

            it('should have properties with datauri format splitted', function () {
                dUri.should.have.property('fileName', fixture);
                dUri.should.have.property('base64', 'Zm9vIGJhcgo=');
                dUri.should.have.property('mimetype', 'text/plain');
                dUri.should.have.property('content', 'data:text/plain;base64,Zm9vIGJhcgo=');
            });


            describe('#getCss' , function () {
                it('should create a class with datauri background using target file name', function () {
                    dUri.getCss().should.equal('\n.fixture {\n    background: url(\'data:text/plain;base64,Zm9vIGJhcgo=\')\n}');
                });

                it('should create a class with datauri background using a defined name', function () {
                    dUri.getCss('foobar').should.equal('\n.foobar {\n    background: url(\'data:text/plain;base64,Zm9vIGJhcgo=\')\n}');
                });
            });
        });

    });

    describe('running sync with arguments', function () {

        before(function () {
            dUri = new DataURI(fixture);
        });

        after(function () {
            dUri = null;
        });

        it('should instance DataURI class', function () {
            dUri.should.be.an.instanceOf(DataURI)
        });

        it('should have properties with datauri format splitted', function () {
            dUri.should.have.property('fileName', fixture);
            dUri.should.have.property('base64', 'Zm9vIGJhcgo=');
            dUri.should.have.property('mimetype', 'text/plain');
            dUri.should.have.property('content', 'data:text/plain;base64,Zm9vIGJhcgo=');
        });

        it('should run datauri as function and return a string', function () {
            var dFunc = DataURI(fixture);

            dFunc.should.equal('data:text/plain;base64,Zm9vIGJhcgo=');
        });

        it('should throw an error if a specific file doesn\'t exist', function () {
            var expectedMsg = 'The file ' + wrongFile + ' was not found!';

            (function () {
                new DataURI(wrongFile);
            }).should.throw(expectedMsg);
            (function () {
                DataURI(wrongFile);
            }).should.throw(expectedMsg);
        });

        describe('#getCss' , function () {
            it('should create a class with datauri background using target file name', function () {
                dUri.getCss().should.equal('\n.fixture {\n    background: url(\'data:text/plain;base64,Zm9vIGJhcgo=\')\n}');
            });

            it('should create a class with datauri background using a defined name', function () {
                dUri.getCss('foobar').should.equal('\n.foobar {\n    background: url(\'data:text/plain;base64,Zm9vIGJhcgo=\')\n}');
            });
        });

    });

});
