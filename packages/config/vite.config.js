import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'cjs'],
      fileName: (format) => `my-library.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    outDir: 'dist'
  },
  rollupOptions: {
    external: (id) => !id.startsWith('.') && !id.startsWith('/'),
    output: {
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].mjs'
    }
  }
});
