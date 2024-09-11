import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.app.json' }),
    cssInjectedByJsPlugin() // Bundling CSS into JS
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
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: `assets/[name].[ext]`
      }
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local'
    }
  }
})
