import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import dts from 'vite-plugin-dts'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
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
        }
      }
    }
  },
  plugins: [react(), dts({ tsconfigPath: './tsconfig.app.json' })],
  css: {
    modules: {
      scopeBehaviour: 'local'
    }
  }
})
