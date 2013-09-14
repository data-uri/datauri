describe('DataURI Class', function () {

    var should  = require('chai').should(),
        DataURI = require('../../lib/exec'),
        fixture = 'test/fixture.txt',
        dUri, cssContent;

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
            dUri.should.have.property('base64', 'Zm9vIGJhcgo=');
            dUri.should.have.property('mimetype', 'text/plain');
            dUri.should.have.property('content', 'data:text/plain;base64,Zm9vIGJhcgo=');
        });

        it('should run datauri as function and return a string', function () {
            var dFunc = DataURI(fixture);

            dFunc.should.equal('data:text/plain;base64,Zm9vIGJhcgo=');
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
