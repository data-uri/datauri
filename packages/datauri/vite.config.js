import superConfig from 'config/vite.config.js';
import { defineConfig, mergeConfig } from 'vite';
export default mergeConfig(
  superConfig,
  defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'DataURI'
      }
    }
  })
);
