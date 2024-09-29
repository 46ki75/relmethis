import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import preserveDirectives from 'rollup-preserve-directives'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.app.json' }),
    UnoCSS(),
    cssInjectedByJsPlugin(), // Bundling CSS into JS
    preserveDirectives() // keep 'use client'
  ],
  base: '/relmethis',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'relmethis',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        assetFileNames: `assets/[name].[ext]`
      }
    },
    minify: false,
    ssr: true,
    ssrEmitAssets: true,
    ssrManifest: true
  },
  css: {
    modules: {
      scopeBehaviour: 'local'
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    },
    postcss: './postcss.config.js'
  }
})
