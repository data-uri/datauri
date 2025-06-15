import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    ssr: true,
    outDir: 'dist',
    rollupOptions: {
      output: [
        // ES Module output
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          preserveModulesRoot: 'src'
        },
        // CommonJS output
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs',
          preserveModules: true,
          preserveModulesRoot: 'src'
        }
      ]
    }
  }
});
