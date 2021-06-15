import {defineConfig} from 'vite'
import vitePluginVuedoc, {vueDocFiles} from 'vite-plugin-vuedoc'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [vitePluginVuedoc({}), vue({
    include: [...vueDocFiles] // 2. Must include .md | .vd files
  }),
  Pages({
    pagesDir: 'src/packages',
    extensions: ['md']
    // exclude: ['**/components/*.vue']
  })
  ],
  base: './',
  resolve: {
    alias: {
      '@/': '/src/'
    }
  }
})
