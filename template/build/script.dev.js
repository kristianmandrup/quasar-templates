var
  path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  config = require('../config'),
  platform = require('./platform'),
  proxyMiddleware = require('http-proxy-middleware'),
  webpackConfig = process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('koa-webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('koa-webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// from https://github.com/kristianmandrup/koa-vue-dev/blob/master/src/index.js
const convert = require('koa-convert');
const compose = convert.compose;

// serve webpack bundle output
// and enable hot-reload and state-preserving
// compilation error display
// compose into one development server
// also use convert to make compatible with Koa2 Promise API
const devServer = return compose([convert(devMiddleware), convert(hotMiddleware)]);

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

const connectHistoryApiFallback = require('connect-history-api-fallback')
// handle fallback for HTML5 history API
app.use(connectHistoryApiFallback())

app.use(devServer)

// serve pure static assets
const serve = require('koa-static');

app.use(serve('./src/statics'))

// try to serve Cordova statics for Play App
app.use(serve(platform.cordovaAssets))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Running with "' + (process.argv[2] || 'mat') + '" theme')
  console.log('Listening at http://localhost:' + port + '\n')
  console.log('Building. Please wait...')
})
