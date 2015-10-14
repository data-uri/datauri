import fs from 'fs';
import { should as Should } from 'chai';
import { exec as execute } from 'child_process';
import * as cssExp from '../expected/css';

const should = Should();
const fixture = 'test/fixture.gif';
const expected = new RegExp(
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
);

let cli = './bin/datauri';

if (process.argv.join('').match('watch')) {
  cli += ' --env=watch'
}

let dUri, cssContent;

describe('Data-uri Client', () => {

  describe('generate a data-uri string', () => {

    it('should give advice when a user do not type anything after datauri', done => {
      let expected = new RegExp('Data-uri usage:');

      execute(cli, (err, stdout) => {
        should.not.exist(err);
        stdout.should.not.be.empty;
        stdout.should.match(expected);

        done();
      });
    });

    it('should run datauri through a simple file', done => {
      execute(`${cli} ${fixture}`, (err, stdout) => {
        should.not.exist(err);
        stdout.should.not.be.empty;
        stdout.should.match(expected);

        done();
      });
    });
  });

  describe('generate a data-uri string into a css file', () => {

    let createdFile = 'test/duality.css';

    describe('create a css file', () => {

      afterEach(done => fs.unlink(createdFile, done));

      it('should insert a css class with the target file name',
        done => {
          execute(`${cli} ${fixture} --css=${createdFile}`, (err,
            stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/created/);
            fs.existsSync(createdFile).should.be.true;
            fs.readFileSync(createdFile, 'utf-8').should.equal(cssExp.simple);
            done();
          });
        });

      it('should insert a css class with a specific name', done => {
        let cssClass = 'foobar';

        execute(
          `${cli} ${fixture} --css=${createdFile} --class=${cssClass}`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/created/);
            fs.existsSync(createdFile).should.be.true;
            fs.readFileSync(createdFile, 'utf-8').should.equal(cssExp.customName);
            done();
          });
      });

      it('should insert a css class with a width', done => {
        execute(
          `${cli} ${fixture} --css=${createdFile} --width`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/created/);
            fs.existsSync(createdFile).should.be.true;
            fs.readFileSync(createdFile, 'utf-8').should.equal(cssExp.width);
            done();
          });
      });

      it('should insert a css class with a height', done => {
        execute(
          `${cli} ${fixture} --css=${createdFile} --height`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/created/);
            fs.existsSync(createdFile).should.be.true;
            fs.readFileSync(createdFile, 'utf-8').should.equal(cssExp.height);
            done();
          });
      });


      it('should insert a css class with both width and height', done => {
        execute(
          `${cli} ${fixture} --css=${createdFile} --width --height`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/created/);
            fs.existsSync(createdFile).should.be.true;
            fs.readFileSync(createdFile, 'utf-8').should.equal(cssExp.both);
            done();
          });
      });

      it('should insert a css class with both width a background-size', done => {
        execute(
          `${cli} ${fixture} --css=${createdFile} --background-size`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/created/);
            fs.existsSync(createdFile).should.be.true;
            fs.readFileSync(createdFile, 'utf-8').should.equal(cssExp.bgsize);
            done();
          });
      });
    });

    describe('update a css file', () => {

      let updateFile = 'test/ratamahatta.scss';
      let fakeContent = '.small-icon {color: #000;}';
      let updateClass = fakeContent + cssExp.simple;

      beforeEach(() => fs.writeFileSync(updateFile, fakeContent));
      afterEach(() => fs.unlinkSync(updateFile));

      it('should insert a css class with the target file name',
        done => {
          execute(`${cli} ${fixture} --css=${updateFile}`, (err,
            stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/updated/);
            fs.readFileSync(updateFile, 'utf-8').should.equal(
              updateClass);
            done();
          });
        });

      it('should insert a css class with a specific name', done => {
        let cssClass = 'pipoca',
          fileContent = updateClass.replace('fixture', cssClass);

        execute(`${cli} ${fixture} --css=${updateFile} --class=${cssClass}`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/updated/);
            fs.readFileSync(updateFile, 'utf-8').should.equal(
              fileContent);
            done();
          });
      });

      it('should insert a css class with a width', done => {
        updateClass = fakeContent + cssExp.width;
        execute(`${cli} ${fixture} --css=${updateFile} --width`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/updated/);
            fs.existsSync(updateFile).should.be.true;
            fs.readFileSync(updateFile, 'utf-8').should.equal(updateClass);
            done();
          });
      });

      it('should insert a css class with a height', done => {
        updateClass = fakeContent + cssExp.height;
        execute(`${cli} ${fixture} --css=${updateFile} --height`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/updated/);
            fs.existsSync(updateFile).should.be.true;
            fs.readFileSync(updateFile, 'utf-8').should.equal(updateClass);
            done();
          });
      });


      it('should insert a css class with both width and height', done => {
        updateClass = fakeContent + cssExp.both;
        execute(`${cli} ${fixture} --css=${updateFile} --width --height`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/updated/);
            fs.existsSync(updateFile).should.be.true;
            fs.readFileSync(updateFile, 'utf-8').should.equal(updateClass);
            done();
          });
      });

      it('should insert a css class with both width a background-size', done => {
        updateClass = fakeContent + cssExp.bgsize;
        execute(`${cli} ${fixture} --css=${updateFile} --background-size`, (
            err, stdout) => {
            should.not.exist(err);
            stdout.should.not.be.empty;
            stdout.should.match(/updated/);
            fs.existsSync(updateFile).should.be.true;
            fs.readFileSync(updateFile, 'utf-8').should.equal(updateClass);
            done();
          });
      });
    });
  });
});
