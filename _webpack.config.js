const path = require('path')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
//css压缩
const cssMinimizerWebpackPlugin =require('css-minimizer-webpack-plugin')
function pahtResolve(dir){
    return path.resolve(`${__dirname}/`,dir)
}
//统一入口
const commonEntry={
    index:'./src/index.ts',
    second:'./src/ts/second.ts'
}
//公用css loader
const commonCssLoader =[MiniCssExtractPlugin.loader,'css-loader']
module.exports={
    mode:'production',
    entry:{
        ...commonEntry
    },
    output:{
        filename:'js/[name].bundle.js',
        path:pahtResolve('package'),
        assetModuleFilename: 'images/[hash][ext][query]',
        clean:true
    },
    resolve:{
        alias:{
            '@':pahtResolve('src')
        },
        extensions :['.js','.ts','.css','.scss']
    },
    module:{
        rules:[
            {test:/\.ts?$/,use:['ts-loader']},
            {oneOf:[
                {test:/\.css$/,use:[...commonCssLoader]},
                {test:/\.scss$/,use:[...commonCssLoader,'sass-loader']}
            ]},
            {test:/\.(png|gif|jpg|jpeg|svg)$/,type:'asset/resource'}
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({filename:'css/[name].css',chunkFilename:'[name].chunk.css'}),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
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
}