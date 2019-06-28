/** 将组件打包成ak.js，可在页面通过<script src="ak.js"></script>方式引入*/
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const commJs = {
  entry: './packages/index.js',
  /*entry: {
    app: ['babel-polyfill', './packages/index.js']
  },*/
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/ak.js',
    library: 'AK',
    libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('node_modules/webpack-dev-server/client')]
      }
    ]
  }
}
const jsConfig = {
  entry: commJs.entry,
  output: commJs.output,
  resolve: commJs.resolve,
  module: commJs.module
}
const jsMinConfig = {
  entry: commJs.entry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/ak.min.js',
    library: 'AK',
    libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
  },
  resolve: commJs.resolve,
  module: commJs.module,
  plugins: [
    new UglifyJSPlugin({ //压缩代码
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true, // 尝试移除调试信息
          drop_console: true
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
const cssConfig = {
  entry: './docs/scss/index.scss',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'style/ak.css'
  },
  module: {
    loaders: [
      {
        test: /\.eot|ttf|svg|png|gif|woff2?$/,
        exclude: /node_modules/,
        loader: 'url'
        /*query: {
          limit: 10240,
          name: 'images/[name].[ext]'
        }*/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true //css压缩
            }
          }, {
            loader: 'sass-loader'
          }]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style/ak.css')
  ],
}
module.exports = [jsConfig, jsMinConfig, cssConfig]
