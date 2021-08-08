import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { paste } from 'copy-paste';
const fixture = 'src/__tests__/fixtures/fixture.gif';
const expectedString =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const execute = (cmd: string) =>
  new Promise((resolve, reject) => {
    exec(cmd, (err, data) => (err ? reject(err) : resolve(data)));
  });

const cli = path.join(process.cwd(), 'lib/datauri-cli/index.js');

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
    const createdFile = 'src/__tests__/fancy.css';

    describe('create a css file', () => {
      afterEach((done) => fs.unlink(createdFile, done));

      it('should insert a css class with the target file name', (done) => {
        exec(`${cli} ${fixture} --css=${createdFile}`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('created');
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with a specific name', (done) => {
        const cssClass = 'foobar';

        exec(`${cli} ${fixture} --css=${createdFile} --class=${cssClass}`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('created');
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with a width', (done) => {
        exec(`${cli} ${fixture} --css=${createdFile} --width`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('created');
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with a height', (done) => {
        exec(`${cli} ${fixture} --css=${createdFile} --height`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('created');
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with both width and height', (done) => {
        exec(`${cli} ${fixture} --css=${createdFile} --width --height`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('created');
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with both width a backgroundSize', (done) => {
        exec(`${cli} ${fixture} --css=${createdFile} --width --backgroundSize`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('created');
          expect(fs.existsSync(createdFile)).toBeTruthy();
          expect(fs.readFileSync(createdFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });
    });

    describe('update a css file', () => {
      const updateFile = 'src/__tests__/ultra.scss';
      const fakeContent = '.small-icon {color: #000;}';

      beforeEach(() => fs.writeFileSync(updateFile, fakeContent));
      afterEach(() => fs.unlinkSync(updateFile));

      it('should insert a css class with the target file name', (done) => {
        exec(`${cli} ${fixture} --css=${updateFile}`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('updated');
          expect(fs.readFileSync(updateFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with a custom name', (done) => {
        const cssClass = 'pipoca';

        exec(`${cli} ${fixture} --css=${updateFile} --className=${cssClass}`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('updated');
          expect(fs.readFileSync(updateFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with a width', (done) => {
        exec(`${cli} ${fixture} --css=${updateFile} --width`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('updated');
          expect(fs.existsSync(updateFile)).toBeTruthy();
          expect(fs.readFileSync(updateFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with a height', (done) => {
        exec(`${cli} ${fixture} --css=${updateFile} --height`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('updated');
          expect(fs.existsSync(updateFile)).toBeTruthy();
          expect(fs.readFileSync(updateFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with both width and height', (done) => {
        exec(`${cli} ${fixture} --css=${updateFile} --width --height`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('updated');
          expect(fs.existsSync(updateFile)).toBeTruthy();
          expect(fs.readFileSync(updateFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });

      it('should insert a css class with both width a backgroundSize', (done) => {
        exec(`${cli} ${fixture} --css=${updateFile} --backgroundSize`, (err, stdout) => {
          expect(err).toBeFalsy();
          expect(stdout).toBeTruthy();
          expect(stdout).toContain('updated');
          expect(fs.existsSync(updateFile)).toBeTruthy();
          expect(fs.readFileSync(updateFile, 'utf-8')).toMatchSnapshot();
          done();
        });
      });
    });

    describe('output a css', () => {
      it('should display a css class with the target file name', async () => {
        const stdout = await execute(`${cli} ${fixture} --css`);

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it('should display a css class with a specific name', async () => {
        const cssClass = 'pipoca';

        const stdout = await execute(`${cli} ${fixture} --css --class=${cssClass}`);

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it('should display a css class with image width', async () => {
        const stdout = await execute(`${cli} ${fixture} --css --width`);

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it('should display a css class with image height', async () => {
        const stdout = await execute(`${cli} ${fixture} --css --height`);

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it('should display a css class with image width and height', async () => {
        const stdout = await execute(`${cli} ${fixture} --css --width --height`);

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it('should display a css class with background-size', async () => {
        const stdout = await execute(`${cli} ${fixture} --css --backgroundSize`);

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });
    });
  });
});
