const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
require("babel-polyfill");
 /* "build": "webpack -p --display-optimization-bailout --progress --colors"  下面代码只是视图化编译   */
// const Visualizer = require('webpack-visualizer-plugin'); // remove it in production environment.
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // remove it in production environment.
// const otherPlugins = process.argv[1].indexOf('webpack-dev-server') >= 0 ? [] : [
//   new Visualizer(), // remove it in production environment.
//   new BundleAnalyzerPlugin({
//     defaultSizes: 'parsed',
//     // generateStatsFile: true,
//     statsOptions: { source: false }
//   }), // remove it in production environment.
// ];

const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({ rootValue: 23.4375, propWhiteList: [] })
  ],
};

var proxy = { //测试环境demo地址
  '/api/': {
      target: 'http://120.77.34.67:8118/',
      changeOrigin: true, //允许跨域
      secure: false //运行https
  }
};

module.exports = {
  devtool: 'inline-source-map', // or 'inline-source-map'
  devServer: {
    host: 'localhost',
    port: 9090,
    compress: true,
    disableHostCheck: true,
    proxy
  },

  entry: { "index": ['babel-polyfill', path.resolve(__dirname, 'src/App')] },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },

  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), path.join(__dirname, 'src')],
    extensions: ['.web.js', '.jsx', '.js', '.json'],
    alias: {
        "@":path.join(__dirname, './src/'),
        "%":path.join(__dirname, './src/images/')
    }
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader',
        options: {
          plugins: [
            'external-helpers', // why not work?
            ["transform-runtime", { polyfill: false }],
            ["import", [{ "style": "css", "libraryName": "antd-mobile" }]]
          ],
          presets: ['es2015', 'stage-0', 'react'],
          ignore: ['./src/util/mui.min.js']
          // presets: [['es2015', { modules: false }], 'stage-0', 'react'] // tree-shaking
        }
      },
      { test: /\.(jpg|png|gif)$/, loader: "url-loader?limit=40960"},
      // 注意：如下不使用 ExtractTextPlugin 的写法，不能单独 build 出 css 文件
      // { test: /\.less$/i, loaders: ['style-loader', 'css-loader', 'less-loader'] },
      // { test: /\.css$/i, loaders: ['style-loader', 'css-loader'] },
      {
        test: /\.(eot|woff2?|ttf|otf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: "fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      },
      {
        test: /\.less$/i, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', { loader: 'postcss-loader', options: postcssOpts }, 'less-loader'
          ]
        })
      },
      {
        test: /\.css$/i, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', { loader: 'postcss-loader', options: postcssOpts }
          ]
        })
      }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: 2,
      name: 'shared',
      allChunks: false,
      filename: 'shared.js'
    }),
    new webpack.DefinePlugin({
      "process.env": { 
          NODE_ENV: JSON.stringify(process.env.NODE_ENV) 
      }
    }),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: false }),
    // ...otherPlugins   视图编译
  ]
}
