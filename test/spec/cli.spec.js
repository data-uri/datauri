import fs from 'fs';
import { should as Should } from 'chai';
import { exec } from 'child_process';
import * as cssExp from '../expected/css';
import { paste } from 'copy-paste';

const should = Should();
const fixture = 'test/fixture.gif';
const expectedString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
const expected = new RegExp(expectedString);

const execute = cmd => new Promise((resolve, reject) => {
  exec(cmd, (err, data) => err ? reject(err) : resolve(data));
});

const cli = cli_cmd;

let dUri, cssContent;

describe('Data-uri CLI', () => {

  describe('generate a data-uri string', () => {
    it('should give advice when a user do not type anything after datauri', async() => {
      const stdout = await execute(cli);

      stdout.should.not.be.empty;
      stdout.should.have.string('Data-uri usage:');
    });

    it('should run datauri through a simple file', async() => {
      const stdout = await execute(`${cli} ${fixture}`);

      stdout.should.not.be.empty;
      stdout.should.have.string(expectedString);
    });
  });

  describe('--css', () => {

    let createdFile = 'test/duality.css';

    describe('create a css file', () => {

      afterEach(done => fs.unlink(createdFile, done));

      it('should insert a css class with the target file name',
        done => {
          exec(`${cli} ${fixture} --css=${createdFile}`, (err,
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

        exec(
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
        exec(
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
        exec(
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
        exec(
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
        exec(
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
          exec(`${cli} ${fixture} --css=${updateFile}`, (err,
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

        exec(`${cli} ${fixture} --css=${updateFile} --class=${cssClass}`, (
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
        exec(`${cli} ${fixture} --css=${updateFile} --width`, (
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
        exec(`${cli} ${fixture} --css=${updateFile} --height`, (
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
        exec(`${cli} ${fixture} --css=${updateFile} --width --height`, (
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
        exec(`${cli} ${fixture} --css=${updateFile} --background-size`, (
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

    describe('output a css', () => {
      let updateClass = cssExp.simple;

      it('should display a css class with the target file name', async() => {
          const stdout = await execute(`${cli} ${fixture} --css`);

          stdout.should.not.be.empty;
          stdout.should.have.string(updateClass);
      });

      it('should display a css class with a specific name', async() => {
        const cssClass = 'pipoca';
        const expected = updateClass.replace('fixture', cssClass)

        const stdout = await execute(`${cli} ${fixture} --css --class=${cssClass}`);

        stdout.should.not.be.empty;
        stdout.should.have.string(expected);
      });

      it('should display a css class with image width', async() => {
        const expected = cssExp.width;

        const stdout = await execute(`${cli} ${fixture} --css --width`);

        stdout.should.not.be.empty;
        stdout.should.have.string(expected);
      });

      it('should display a css class with image height', async() => {
        const expected = cssExp.height;

        const stdout = await execute(`${cli} ${fixture} --css --height`);

        stdout.should.not.be.empty;
        stdout.should.have.string(expected);
      });

      it('should display a css class with image width and height', async() => {
        const expected = cssExp.both;

        const stdout = await execute(`${cli} ${fixture} --css --width --height`);

        stdout.should.not.be.empty;
        stdout.should.have.string(expected);
      });

      it('should display a css class with background-size', async() => {
        const expected = cssExp.bgsize;

        const stdout = await execute(`${cli} ${fixture} --css --background-size`);

        stdout.should.not.be.empty;
        stdout.should.have.string(expected);
      });
    });
  });

  if (!process.env.TRAVIS) {
    describe('--copy', () => {
      it('should copy a datauri', async() => {

        const stdout = await execute(`${cli} ${fixture} --copy`);

        stdout.should.not.be.empty;

        paste().should.have.string(expectedString);
      });

      it('should copy css with datauri', async() => {

        const stdout = await execute(`${cli} ${fixture} --copy --css`);

        stdout.should.not.be.empty;
        paste().should.have.string(cssExp.simple);
      });
    });
  }
});
