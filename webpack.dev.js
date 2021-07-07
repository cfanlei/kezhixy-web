const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')
module.exports = merge(common, {
    mode: 'development',
    plugins:[
      new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './package',
      hot:true,
      open:true,
      compress:true,
      port:3000
    },
  })