/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

const entry = {
  index: path.resolve(__dirname, 'src/index.ts'),
  "cn/index": path.resolve(__dirname, 'src/cn/index.ts'),
  "cn/cn": path.resolve(__dirname, 'src/cn/cn.ts'),
}

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/utils',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
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
      name: 'utils',
      formats: ['es'],
      fileName: (format, entryName) => {
        return format === 'es'
          ? `${entryName}.mjs`
          : `${entryName}.${format}`
      },
    },
    rollupOptions: {
      external: ['clsx', 'tailwind-merge'],
      output: {
        exports: 'named',
        globals: {
          clsx: "clsx",
        },
      },
    },
  },
});
