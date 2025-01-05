/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

const createEntry = (filename: string): Record<string, string> => {
  return {
    [`${filename}/index`]: path.resolve(__dirname, `src/${filename}/index.ts`),
    [`${filename}/${filename}`]: path.resolve(__dirname, `src/${filename}/${filename}.tsx`),
  }
}

// TODO: create globAsync reducer func
const entry = {
  index: path.resolve(__dirname, 'src/index.ts'),
  ...createEntry('accordion'),
  ...createEntry('alert-dialog'),
  ...createEntry('aspect-ratio'),
  ...createEntry('avatar'),
  // badge
  "badge/index": path.resolve(__dirname, 'src/badge/index.ts'),
  "badge/Badge": path.resolve(__dirname, 'src/badge/Badge.tsx'),
  "badge/badgeVariants": path.resolve(__dirname, 'src/badge/badgeVariants.ts'),
  ...createEntry('breadcrumb'),
  // button
  "button/index": path.resolve(__dirname, 'src/button/index.ts'),
  "button/Button": path.resolve(__dirname, 'src/button/Button.tsx'),
  "button/buttonVariants": path.resolve(__dirname, 'src/button/buttonVariants.ts'),
  ...createEntry('calendar'),
  ...createEntry('card'),
  ...createEntry('carousel'),
  ...createEntry('chart'),
  ...createEntry('checkbox'),
  ...createEntry('collapsible'),

  // combobox

  ...createEntry('dialog'),
  ...createEntry('drawer'),
  ...createEntry('dropdown-menu'),
  ...createEntry('form'),

  'hooks/index': path.resolve(__dirname, 'src/hooks/index.ts'),

  ...createEntry('hover-card'),
  ...createEntry('input'),
  ...createEntry('input-otp'),
  ...createEntry('label'),
  ...createEntry('menubar'),
  ...createEntry('navigation-menu'),
  ...createEntry('pagination'),
  ...createEntry('popover'),
  ...createEntry('progress'),
  ...createEntry('radio-group'),
  ...createEntry('resizable'),
  ...createEntry('scroll-area'),
  ...createEntry('select'),
  ...createEntry('separator'),
  ...createEntry('sheet'),
  ...createEntry('sidebar'),
  ...createEntry('skeleton'),
  ...createEntry('slider'),
  ...createEntry('sonner'),
  ...createEntry('switch'),
  ...createEntry('table'),
  ...createEntry('tabs'),
  ...createEntry('textarea'),

  ...createEntry('toast'), //
  ...createEntry('toaster'), //

  ...createEntry('toggle'), //

  ...createEntry('toggle-group'),
  ...createEntry('tooltip'),
}

const rollupExternal = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  "tailwindcss",
  "postcss",
  "autoprefixer",
  "class-variance-authority",
  "@hookform/resolvers",
  "@radchenkobohdan/utils",
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-avatar",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-hover-card",
  "@radix-ui/react-label",
  "@radix-ui/react-menubar",
  "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-slot",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-toggle",
  "@radix-ui/react-toggle-group",
  "@radix-ui/react-tooltip",
  "class-variance-authority",
  "cmdk",
  "date-fns",
  "embla-carousel-react",
  "input-otp",
  "lucide-react",
  "next-themes",
  "react-day-picker",
  "react-hook-form",
  "react-resizable-panels",
  "recharts",
  "sonner",
  "vaul"
]

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
    libInjectCss()
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
      external: rollupExternal,
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          "tailwindcss": "tailwindcss",
          "postcss": "postcss",
        },
        // chunkFileNames: 'chunks/[name].[hash].js',
        // assetFileNames: 'assets/[name][extname]',
        // entryFileNames: '[name].js',
      }
    },
  },
  css: {
    postcss: {
      plugins: [tailwind, autoprefixer],
    }
  }
});
