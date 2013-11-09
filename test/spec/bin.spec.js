describe('Data-uri Client', function () {
    'use strict';

    var fs        = require('fs'),
        should    = require('chai').should(),
        fixture   = 'test/fixture.txt',
        child     = require('child_process'),
        execute   = child.exec,
        cli       = './bin/datauri ',
        expected  = new RegExp('data:text/plain;base64,Zm9vIGJhcgo='),
        dUri, cssContent;


    describe('generate a data-uri string', function () {
        it('should give advice when a user do not type anything after datauri', function (done) {
            var expected = new RegExp('How to use Data-uri client:');

            execute(cli, function (err, stdout) {
                should.not.exist(err);
                stdout.should.not.be.empty;
                stdout.should.match(expected);

                done();
            });
        });

        it('should run datauri through a simple file', function (done) {
            execute(cli + fixture, function (err, stdout) {
                should.not.exist(err);
                stdout.should.not.be.empty;
                stdout.should.match(expected);

                done();
            });
        });
    });

    describe('generate a data-uri string into a css file', function () {

        var createdFile  = 'test/duality.css',
            createdClass = '\n.fixture {\n    background: url(\'data:text/plain;base64,Zm9vIGJhcgo=\')\n}';

        it('should not run if given css path has no compatible extension', function (done) {
            var expected = 'Your css file must have extension: .css, .sass, .scss, .styl or .less\n';

            execute(cli + fixture + ' test/duality.js', function (err, stdout) {
                should.not.exist(err);
                stdout.should.not.be.empty;
                stdout.should.equal(expected);

                done();
            });
        });

        describe('create a file', function () {

            afterEach(function () {
                fs.unlinkSync(createdFile);
            });

            it('should insert a css class with the target file name', function (done) {
                execute(cli + fixture + ' ' + createdFile, function (err, stdout) {
                    should.not.exist(err);
                    stdout.should.not.be.empty;
                    stdout.should.match(/created/);
                    fs.existsSync(createdFile).should.be.true;
                    fs.readFileSync(createdFile, 'utf-8').should.equal(createdClass);
                    done();
                });
            });

            it('should insert a css class with a specific name', function (done) {
                var cssClass    = 'pipoca',
                    fileContent = createdClass.replace('fixture', cssClass);

                execute(cli + fixture + ' ' + createdFile + ' ' + cssClass, function (err, stdout) {
                    should.not.exist(err);
                    stdout.should.not.be.empty;
                    stdout.should.match(/created/);
                    fs.existsSync(createdFile).should.be.true;
                    fs.readFileSync(createdFile, 'utf-8').should.equal(fileContent);
                    done();
                });
            });
        });

        describe('update a file', function () {

            var updateFile  = 'test/ratamahatta.css',
                fakeContent = '.small-icon {color: #000;}',
                updateClass = fakeContent + createdClass;

            beforeEach(function () {
                fs.writeFileSync(updateFile, fakeContent);
            });

            afterEach(function () {
                fs.unlinkSync(updateFile);
            });

            it('should insert a css class with the target file name', function (done) {
                execute(cli + fixture + ' ' + updateFile, function (err, stdout) {
                    should.not.exist(err);
                    stdout.should.not.be.empty;
                    stdout.should.match(/updated/);
                    fs.readFileSync(updateFile, 'utf-8').should.equal(updateClass);
                    done();
                });
            });

            it('should insert a css class with a specific name', function (done) {
                var cssClass    = 'pipoca',
                    fileContent = updateClass.replace('fixture', cssClass);

                execute(cli + fixture + ' ' + updateFile + ' ' + cssClass, function (err, stdout) {
                    should.not.exist(err);
                    stdout.should.not.be.empty;
                    stdout.should.match(/updated/);
                    fs.readFileSync(updateFile, 'utf-8').should.equal(fileContent);
                    done();
                });
            });
        });
    });

});
