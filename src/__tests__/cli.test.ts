import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import * as cssExp from './expected/css';
import { paste } from 'copy-paste';
const fixture = 'src/__tests__/fixtures/fixture.gif';
const expectedString = 'data:image/gif;name=fixture.gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const expected = new RegExp(expectedString);

const execute = (cmd: string) => new Promise((resolve, reject) => {
  exec(cmd, (err, data) => err ? reject(err) : resolve(data));
});

const cli = path.join(process.cwd(), 'lib/datauri-cli/index.js');

let dUri, cssContent;

describe('Data-uri CLI', () => {

  describe('generate a data-uri string', () => {
    it('should give advice when a user do not type anything after datauri', async () => {
      const stdout = await execute(cli);

      expect(stdout).toBeTruthy();
      expect(stdout).toContain('Data-uri usage:');
    });

    it('should run datauri through a simple file', async () => {
      const stdout = await execute(`${cli} ${fixture}`);

      expect(stdout).toBeTruthy();
      expect(stdout).toContain(expectedString);
    });
  });

  describe('--css', () => {

    let createdFile = 'src/__tests__/fancy.css';

    describe('create a css file', () => {

      afterEach(done => fs.unlink(createdFile, done));

      it('should insert a css class with the target file name',
        done => {
          exec(`${cli} ${fixture} --css=${createdFile}`, (err,
            stdout) => {
            expect(err).toBeFalsy();
            expect(stdout).toBeTruthy();
            expect(stdout).toContain("created");
            expect(fs.existsSync(createdFile)).toBeTruthy();
            expect(fs.readFileSync(createdFile, 'utf-8')).toEqual(cssExp.simple);
            done();
          });
        });

      it('should insert a css class with a specific name', done => {
        let cssClass = 'foobar';

        exec(
          `${cli} ${fixture} --css=${createdFile} --class=${cssClass}`, (
            err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("created");
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toEqual(cssExp.customName);
          done();
        });
      });

      it('should insert a css class with a width', done => {
        exec(
          `${cli} ${fixture} --css=${createdFile} --width`, (
            err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("created");
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toEqual(cssExp.width);
          done();
        });
      });

      it('should insert a css class with a height', done => {
        exec(
          `${cli} ${fixture} --css=${createdFile} --height`, (
            err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("created");
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toEqual(cssExp.height);
          done();
        });
      });


      it('should insert a css class with both width and height', done => {
        exec(
          `${cli} ${fixture} --css=${createdFile} --width --height`, (
            err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("created");
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toEqual(cssExp.both);
          done();
        });
      });

      it('should insert a css class with both width a background-size', done => {
        exec(
          `${cli} ${fixture} --css=${createdFile} --background-size`, (
            err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("created");
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toEqual(cssExp.bgsize);
          done();
        });
      });
    });

    describe('update a css file', () => {

      let updateFile = 'src/__tests__/ultra.scss';
      let fakeContent = '.small-icon {color: #000;}';
      let updateClass = fakeContent + cssExp.simple;

      beforeEach(() => fs.writeFileSync(updateFile, fakeContent));
      afterEach(() => fs.unlinkSync(updateFile));

      it('should insert a css class with the target file name',
        done => {
          exec(`${cli} ${fixture} --css=${updateFile}`, (err,
            stdout) => {
            expect(err).toBeFalsy();
            expect(stdout).toBeTruthy();
            expect(stdout).toContain("updated");
            expect(fs.readFileSync(updateFile, 'utf-8')).toEqual(
              updateClass);
            done();
          });
        });

      it('should insert a css class with a specific name', done => {
        let cssClass = 'pipoca',
          fileContent = updateClass.replace('fixture', cssClass);

        exec(`${cli} ${fixture} --css=${updateFile} --class=${cssClass}`, (
          err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("updated");
          expect(fs.readFileSync(updateFile, 'utf-8')).toEqual(
            fileContent);
          done();
        });
      });

      it('should insert a css class with a width', done => {
        updateClass = fakeContent + cssExp.width;
        exec(`${cli} ${fixture} --css=${updateFile} --width`, (
          err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("updated");
          expect(fs.existsSync(updateFile)).toBeTruthy();
          expect(fs.readFileSync(updateFile, 'utf-8')).toEqual(updateClass);
          done();
        });
      });

      it('should insert a css class with a height', done => {
        updateClass = fakeContent + cssExp.height;
        exec(`${cli} ${fixture} --css=${updateFile} --height`, (
          err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("updated");
          expect(fs.existsSync(updateFile)).toBeTruthy();
          expect(fs.readFileSync(updateFile, 'utf-8')).toEqual(updateClass);
          done();
        });
      });


      it('should insert a css class with both width and height', done => {
        updateClass = fakeContent + cssExp.both;
        exec(`${cli} ${fixture} --css=${updateFile} --width --height`, (
          err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("updated");
          expect(fs.existsSync(updateFile)).toBeTruthy();
          expect(fs.readFileSync(updateFile, 'utf-8')).toEqual(updateClass);
          done();
        });
      });

      it('should insert a css class with both width a background-size', done => {
        updateClass = fakeContent + cssExp.bgsize;
        exec(`${cli} ${fixture} --css=${updateFile} --background-size`, (
          err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain("updated");
          expect(fs.existsSync(updateFile)).toBeTruthy();
          expect(fs.readFileSync(updateFile, 'utf-8')).toEqual(updateClass);
          done();
        });
      });
    });

    describe('output a css', () => {
      let updateClass = cssExp.simple;

      it('should display a css class with the target file name', async () => {
        const stdout = await execute(`${cli} ${fixture} --css`);

        expect(stdout).toBeTruthy();
        expect(stdout).toContain(updateClass);
      });

      it('should display a css class with a specific name', async () => {
        const cssClass = 'pipoca';
        const expected = updateClass.replace('fixture', cssClass)

        const stdout = await execute(`${cli} ${fixture} --css --class=${cssClass}`);

        expect(stdout).toBeTruthy();
        expect(stdout).toContain(expected);
      });

      it('should display a css class with image width', async () => {
        const expected = cssExp.width;

        const stdout = await execute(`${cli} ${fixture} --css --width`);

        expect(stdout).toBeTruthy();
        expect(stdout).toContain(expected);
      });

      it('should display a css class with image height', async () => {
        const expected = cssExp.height;

        const stdout = await execute(`${cli} ${fixture} --css --height`);

        expect(stdout).toBeTruthy();
        expect(stdout).toContain(expected);
      });

      it('should display a css class with image width and height', async () => {
        const expected = cssExp.both;

        const stdout = await execute(`${cli} ${fixture} --css --width --height`);

        expect(stdout).toBeTruthy();
        expect(stdout).toContain(expected);
      });

      it('should display a css class with background-size', async () => {
        const expected = cssExp.bgsize;

        const stdout = await execute(`${cli} ${fixture} --css --background-size`);

        expect(stdout).toBeTruthy();
        expect(stdout).toContain(expected);
      });
    });
  });

  if (!process.env.TRAVIS) {
    describe('--copy', () => {
      it('should copy a datauri', async () => {

        const stdout = await execute(`${cli} ${fixture} --copy`);

        expect(stdout).toBeTruthy();

        expect(paste()).toEqual(expectedString);
      });

      it('should copy css with datauri', async () => {

        const stdout = await execute(`${cli} ${fixture} --copy --css`);

        expect(stdout).toBeTruthy();
        expect(paste()).toEqual(cssExp.simple);
      });
    });
  }
});
