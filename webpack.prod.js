const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require("terser-webpack-plugin");
//css压缩
const cssMinimizerWebpackPlugin =require('css-minimizer-webpack-plugin')
module.exports = merge(common, {
  mode: 'production',
  optimization:{
    minimize :true,
    minimizer: [
        //css 压缩
        new cssMinimizerWebpackPlugin({
            //移除所有注释
            minimizerOptions: {
                preset: [
                  'default',
                  {
                    discardComments: { removeAll: true },
                  },
                ],
              },
        }),
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          //删除注释
          extractComments: false,
        }),
      ],
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
      },
}
});