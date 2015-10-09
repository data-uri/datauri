describe('Data-uri Client', function () {
    'use strict';

    var fs        = require('fs'),
        should    = require('chai').should(),
        fixture   = 'test/fixture.gif',
        child     = require('child_process'),
        execute   = child.exec,
        cli       = './bin/datauri ',
        expected  = new RegExp('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'),
        dUri, cssContent;


    describe('generate a data-uri string', function () {
        it('should give advice when a user do not type anything after datauri', function (done) {
            var expected = new RegExp('Data-uri usage:');

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
            createdClass = "\n.fixture {\n    background-image: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');\n}";

        describe('create a css file', function () {

            afterEach(function (done) {
                fs.unlink(createdFile, done);
            });

            it('should insert a css class with the target file name', function (done) {
                execute(cli + fixture + ' --css=' + createdFile, function (err, stdout) {
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

                execute(cli + fixture + ' --css=' + createdFile + ' --class=' + cssClass, function (err, stdout) {
                    should.not.exist(err);
                    stdout.should.not.be.empty;
                    stdout.should.match(/created/);
                    fs.existsSync(createdFile).should.be.true;
                    fs.readFileSync(createdFile, 'utf-8').should.equal(fileContent);
                    done();
                });
            });
        });

        describe('update a css file', function () {

            var updateFile  = 'test/ratamahatta.scss',
                fakeContent = '.small-icon {color: #000;}',
                updateClass = fakeContent + createdClass;

            beforeEach(function () {
                fs.writeFileSync(updateFile, fakeContent);
            });

            afterEach(function () {
                fs.unlinkSync(updateFile);
            });

            it('should insert a css class with the target file name', function (done) {
                execute(cli + fixture + ' --css=' + updateFile, function (err, stdout) {
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

                execute(cli + fixture + ' --css=' + updateFile + ' --class=' + cssClass, function (err, stdout) {
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
