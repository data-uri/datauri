import superConfig from 'config/vite.config';
import { defineConfig, mergeConfig } from 'vite';

export default mergeConfig(
  superConfig,
  defineConfig({
    build: {
      lib: {
        entry: ['src/index.ts', 'src/sync.ts'],
        name: 'DataURI module'
      },
      rollupOptions: {
        external: ['mimer']
      }
    },
    test: {
      globals: true,
      environment: 'node' // or 'jsdom' if testing browser code
    }
  })
);
