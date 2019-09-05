const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const Spritesmith = require('spritesmith')
const fs = require('fs')
// 不同环境接口url
const prodEnv = {
  serve: {'VUE_APP_BASE_URL': '"/"'},
  docs: {'VUE_APP_BASE_URL': '"/"'},
  build: {'VUE_APP_BASE_URL': '"/"'},
  buildDocs: {'VUE_APP_BASE_URL': '"/"'}
}

const original = JSON.parse(process.env.npm_config_argv).original[1] || 'serve' // 运行的命令名称npm run build=>build
const NODE_ENV = process.env.NODE_ENV === 'production'
let entry = 'src/main.js'
if (original === 'docs' || original === 'buildDocs') {
  entry = 'docs/main.js'
}
// 合并图片，暂不作判断，每次重新生成
let sprites = []
fs.readdir('src/assets/icons', (err, paths) => {
  // 遍历目录找到所有png图片
  if (err) {
    throw err
  }
  paths.forEach(item => {
    if (item.indexOf('.png') !== -1) {
      sprites.push('src/assets/icons/' + item)
    }
  })
  if (sprites.length > 0) {
    /* eslint-disable */
    Spritesmith.run({src: sprites, padding: 5}, handleResult = (err, result) => {
      if (err) {
        throw err
      }
      // 保存图片
      fs.writeFile(path.resolve(__dirname + '/src/assets/images/sprites.png'), result.image, err => {
      })
      // 保存样式
      let style = `[class*='sprites-']{display: inline-block;background: url(../images/sprites.png) no-repeat let top / ${result.properties.width}px ${result.properties.height}px}\r`
      for (let key in result.coordinates) {
        const name = key.replace('src/assets/icons/', '').replace('.png', '')
        let obj = result.coordinates[key]
        style += `.sprites-${name}{width: ${obj.width}px;height: ${obj.height}px;background-position: ${obj.x}px ${obj.y}px}\r`
      }
      fs.writeFile(path.resolve(__dirname + '/src/assets/scss/sprites.scss'), style, err => {
      })
    })
  }
})
let publicPath = '/'
// 打包组件示例时使用相对路径
if (original === 'buildDocs') {
  publicPath = './'
}
module.exports = {
  publicPath: '/',
  assetsDir: 'static',
  outputDir: 'dist-' + original,
  productionSourceMap: false,
  lintOnSave: !NODE_ENV,
  pages: {
    index: {
      entry: entry
    }
  },
  configureWebpack: (config) => {
    let plugins = []
    // 添加环境变量
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': prodEnv[original]
      })
    )
    // 复制static静态资源
    /* plugins.push(
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'static'),
        to: 'static',
        ignore: ['.*', '.svn', '**!/.svn/!**!/!*'] // ingore svn files
      }])
    ) */
    // 不需要重新打包集成的node_modules
    /* config.externals = {
      'echarts': 'echarts'
    } */
    if (NODE_ENV) {
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            /* vendor: {
              // 抽取来自 node_modules 文件夹下的第三方代码，优先级权重为10
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 10 // 优先级
            }, */
            common: {
              // 抽取来自 packages 文件夹下的代码，优先级权重为5
              name: 'ak',
              // test: /[\\/]src[\\/]components[\\/]/,
              test: /[\\/]packages[\\/]/,
              minSize: 1024,
              chunks: 'all',
              priority: 5
            }
          }
        }
      }
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    } else {
      // 为开发环境修改配置...
      // config.mode = 'development'
    }
    config.plugins = [
      ...config.plugins,
      ...plugins
    ]
  },
  chainWebpack: config => {
    // 配置【vue-markdown-loader】解析md格式的文件
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: true,
        use: [
          [
            require('markdown-it-container'),
            'demo',
            {
              validate: function (params) {
                // return params.trim().match(/^demo\s+(.*)$/)
                return params.match(/^demo\s+(.*)$/)
              },
              render (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                  // 1.获取第一行的内容使用markdown渲染html作为组件的描述
                  var markdownRender = require('markdown-it')()
                  let demoInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
                  let description = (demoInfo && demoInfo.length > 1) ? demoInfo[1] : ''
                  let descriptionHTML = description ? markdownRender.render(description) : ''
                  // 2.获取代码块内的html和js代码
                  let content = tokens[idx + 1].content
                  // 3.使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
                  return `
                    <demo-block>
                        <div class="source" slot="source">${content}</div>
                         ${descriptionHTML}
                        <div class="highlight" slot="highlight">`
                } else {
                  return `
                        </div>
                    </demo-block>\n`
                }
              }
            }
          ],
          [require('markdown-it-anchor'), {
            level: 2,
            permalink: true,
            permalinkBefore: true
          }],
          [require('markdown-it-table-of-contents'), {
            includeLevel: [2, 3],
            containerClass: 'container-nav'
          }]
        ]
      })
  }
}
