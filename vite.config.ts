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
/*  build:{
// 去除console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: 'css/[name].[hash].css',
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js'
      }
    },
    lib: {
      entry: 'src/packages/index.ts',
      name: 'MyLib'
    },
    outDir:'dist/'
  }*/
})


/*
export default ({command,mode})=>{
  //....
  return defineConfig({
    //.....
  })
}*/
/*
注入环境变量到html模板中
https://github.com/anncwb/vite-plugin-html
// gzip插件，打包压缩代码成gzip
文档： https://github.com/anncwb/vite-plugin-compression
*/
