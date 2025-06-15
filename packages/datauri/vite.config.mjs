import superConfig from 'config/vite.config';
import { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vite';

export default mergeConfig(
  superConfig,
  defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'DataURI module'
      },
      rollupOptions: {
        external: ['mimer']
      }
    }
  })
);
