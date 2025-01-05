/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const buttonEntry = {
  "button/index": path.resolve(__dirname, 'src/button/index.ts'),
  "button/Button": path.resolve(__dirname, 'src/button/Button.tsx'),
}

const entry = {
  index: path.resolve(__dirname, 'src/index.ts'),
  ...buttonEntry,
}

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/base',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
    libInjectCss(),
  ],
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: './build',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry,
      name: 'base',
      formats: ['es'],
      fileName: (format, entryName) => {
        return format === 'es'
          ? `${entryName}.mjs`
          : `${entryName}.${format}`
      },
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    },
  },
});
