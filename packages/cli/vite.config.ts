import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DataURI CLI',
      formats: ['es']
    },
    rollupOptions: {
      external: ['node:fs', 'datauri', '@datauri/css', 'copy-paste', 'minimist'],
      output: [
        // ES Module output
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs'
        }
      ]
    }
  }
});
