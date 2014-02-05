describe('Data-uri Class', function () {
    'use strict';

    var should    = require('chai').should(),
        sinon     = require('sinon'),
        DataURI   = require('../../lib/exec'),
        fixture   = 'test/fixture.txt',
        wrongFile = 'PAPARIPUPI',
        dUri, cssContent;

    describe('sync', function () {
        describe('running without arguments', function () {

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
                    var errorMsg = 'Insert a File path as string argument';

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

        describe('running with arguments', function () {

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

    describe('async', function () {

        describe('running with callback function', function () {
            it('should run datauri as function with callback', function (done) {
                DataURI(fixture, function (err, content, fullTree) {
                    should.not.exist(err);
                    content.should.equal('data:text/plain;base64,Zm9vIGJhcgo=');
                    fullTree.should.have.property('fileName', fixture);
                    fullTree.should.have.property('base64', 'Zm9vIGJhcgo=');
                    fullTree.should.have.property('mimetype', 'text/plain');
                    fullTree.should.have.property('content', 'data:text/plain;base64,Zm9vIGJhcgo=');

                    done();
                });
            });

            it('should return error when file does not exist', function (done) {
                DataURI('^&%76868', function (err, content) {
                    should.exist(err);
                    done();
                });
            });
        });

        describe('running with event', function () {
            it('should call event "encoded" when a datauri format is done', function (done) {
                dUri = new DataURI();

                dUri.on('encoded', function (content, fullTree) {
                    content.should.equal('data:text/plain;base64,Zm9vIGJhcgo=');

                    fullTree.should.have.property('fileName', fixture);
                    fullTree.should.have.property('base64', 'Zm9vIGJhcgo=');
                    fullTree.should.have.property('mimetype', 'text/plain');
                    fullTree.should.have.property('content', 'data:text/plain;base64,Zm9vIGJhcgo=');

                    done();
                });

                dUri.encode(fixture);
            });

            it('should chain methods and call event "encoded" when a datauri format is done', function (done) {
                dUri = new DataURI();

                dUri.on('encoded', function (content, fullTree) {
                    content.should.equal('data:text/plain;base64,Zm9vIGJhcgo=');

                    fullTree.should.have.property('fileName', fixture);
                    fullTree.should.have.property('base64', 'Zm9vIGJhcgo=');
                    fullTree.should.have.property('mimetype', 'text/plain');
                    fullTree.should.have.property('content', 'data:text/plain;base64,Zm9vIGJhcgo=');

                    done();
                }).encode(fixture);
            });


            it('should call event "error" when a file doesnt exist', function (done) {
                dUri = new DataURI();

                dUri.on('error', function (err) {
                    should.exist(err);
                    done();
                }).encode('^&%76868');
            });
        });

    });

    describe('promise', function () {

        describe('running with then function', function () {
            it('should fulfill a promise', function (done) {
                var dPromises = DataURI.promises,
                    fulfill   = sinon.spy(),
                    reject    = sinon.spy(),
                    expected  = 'data:text/plain;base64,Zm9vIGJhcgo=';

                dPromises(fixture).then(fulfill, reject).then(function () {
                    fulfill.calledOnce.should.be.ok;
                    fulfill.calledWith(expected).should.be.ok;
                    reject.callCount.should.equal(0);

                    done();
                });

            });

            it('should reject a promise', function (done) {
                var dPromises = DataURI.promises;

                dPromises('^&%76868').then(null, function (err) {
                    should.exist(err);
                    done();
                });
            });
        });

    });

});
