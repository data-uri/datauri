import clipboardy from "clipboardy";
import { exec } from "node:child_process";
import fsSync from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const fixture = path.join(process.cwd(), "src/__tests__/fixtures/fixture.gif");
const expectedString =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const execute = (cmd: string) =>
  new Promise((resolve, reject) => {
    exec(cmd, (err, data) => (err ? reject(err) : resolve(data)));
  });

const cli = path.join(process.cwd(), "dist/index.mjs");

describe.skip("Data-uri CLI", () => {
  describe("generate a data-uri string", () => {
    it("should give advice when a user do not type anything after datauri", async () => {
      const stdout = await execute(cli);

      expect(stdout).toBeTruthy();
      expect(stdout).toContain("Data-uri usage:");
    });

    it("should run datauri through a simple file", async () => {
      const stdout = await execute(`${cli} ${fixture}`);

      expect(stdout).toBeTruthy();
      expect(stdout).toContain(expectedString);
    });
  });

  describe("--css", () => {
    const createdFile = "src/__tests__/fancy.css";

    describe("create a css file", () => {
      afterEach(async () => {
        try {
          await fs.unlink(createdFile);
        } catch (err) {
          // File might not exist, ignore error
        }
      });

      it("should insert a css class with the target file name", async () => {
        const stdout = await execute(`${cli} ${fixture} --css=${createdFile}`);

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("created");
        expect(fsSync.existsSync(createdFile)).toBeTruthy();
        expect(await fs.readFile(createdFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with a specific name", async () => {
        const cssClass = "foobar";

        const stdout = await execute(
          `${cli} ${fixture} --css=${createdFile} --class=${cssClass}`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("created");
        expect(fsSync.existsSync(createdFile)).toBeTruthy();
        expect(await fs.readFile(createdFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with a width", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css=${createdFile} --width`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("created");
        expect(fsSync.existsSync(createdFile)).toBeTruthy();
        expect(await fs.readFile(createdFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with a height", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css=${createdFile} --height`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("created");
        expect(fsSync.existsSync(createdFile)).toBeTruthy();
        expect(await fs.readFile(createdFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with both width and height", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css=${createdFile} --width --height`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("created");
        expect(fsSync.existsSync(createdFile)).toBeTruthy();
        expect(await fs.readFile(createdFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with both width a backgroundSize", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css=${createdFile} --width --backgroundSize`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("created");
        expect(fsSync.existsSync(createdFile)).toBeTruthy();
        expect(await fs.readFile(createdFile, "utf-8")).toMatchSnapshot();
      });
    });

    describe("update a css file", () => {
      const updateFile = "src/__tests__/ultra.scss";
      const fakeContent = ".small-icon {color: #000;}";

      beforeEach(async () => {
        await fs.writeFile(updateFile, fakeContent);
      });

      afterEach(async () => {
        try {
          await fs.unlink(updateFile);
        } catch (err) {
          // File might not exist, ignore error
        }
      });

      it("should insert a css class with the target file name", async () => {
        const stdout = await execute(`${cli} ${fixture} --css=${updateFile}`);

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("updated");
        expect(await fs.readFile(updateFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with a custom name", async () => {
        const cssClass = "pipoca";

        const stdout = await execute(
          `${cli} ${fixture} --css=${updateFile} --className=${cssClass}`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("updated");
        expect(await fs.readFile(updateFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with a width", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css=${updateFile} --width`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("updated");
        expect(fsSync.existsSync(updateFile)).toBeTruthy();
        expect(await fs.readFile(updateFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with a height", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css=${updateFile} --height`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("updated");
        expect(fsSync.existsSync(updateFile)).toBeTruthy();
        expect(await fs.readFile(updateFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with both width and height", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css=${updateFile} --width --height`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("updated");
        expect(fsSync.existsSync(updateFile)).toBeTruthy();
        expect(await fs.readFile(updateFile, "utf-8")).toMatchSnapshot();
      });

      it("should insert a css class with both width a backgroundSize", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css=${updateFile} --backgroundSize`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toContain("updated");
        expect(fsSync.existsSync(updateFile)).toBeTruthy();
        expect(await fs.readFile(updateFile, "utf-8")).toMatchSnapshot();
      });
    });

    describe("output a css", () => {
      it("should display a css class with the target file name", async () => {
        const stdout = await execute(`${cli} ${fixture} --css`);

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it("should display a css class with a specific name", async () => {
        const cssClass = "pipoca";

        const stdout = await execute(
          `${cli} ${fixture} --css --class=${cssClass}`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it("should display a css class with image width", async () => {
        const stdout = await execute(`${cli} ${fixture} --css --width`);

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it("should display a css class with image height", async () => {
        const stdout = await execute(`${cli} ${fixture} --css --height`);

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it("should display a css class with image width and height", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css --width --height`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });

      it("should display a css class with background-size", async () => {
        const stdout = await execute(
          `${cli} ${fixture} --css --backgroundSize`,
        );

        expect(stdout).toBeTruthy();
        expect(stdout).toMatchSnapshot();
      });
    });
  });

  if (process.env.CI !== "true" && process.env.CODESPACES !== "true") {
    describe("--copy", () => {
      it("should copy a datauri", async () => {
        const stdout = await execute(`${cli} ${fixture} --copy`);

        expect(stdout).toBeTruthy();

        expect(await clipboardy.read()).toEqual(expectedString);
      });

      it("should copy css with datauri", async () => {
        const stdout = await execute(`${cli} ${fixture} --copy --css`);

        expect(stdout).toBeTruthy();
        expect(await clipboardy.read()).toMatchSnapshot();
      });
    });
  }
});
