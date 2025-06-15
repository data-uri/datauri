import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DataURI CLI",
    },
    rollupOptions: {
      external: [
        "node:fs",
        "datauri/parser",
        "@datauri/css",
        "copy-paste",
        "minimist",
        "mimer",
      ],
      output: [
        // ES Module output
        {
          format: "es",
          dir: "dist",
          entryFileNames: "[name].mjs",
        },
      ],
    },
  },
});
