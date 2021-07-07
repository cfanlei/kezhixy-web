const path = require('path')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
function pahtResolve(dir){
    return path.resolve(`${__dirname}/`,dir)
}
//统一入口
const commonEntry={
    index:'./src/index.ts',
    test:'./src/ts/test.ts'
}
//新增页面需配置
const commonAddNewPage=[
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        filename:'index.html',
        chunks:['index']
    }),
    new HtmlWebpackPlugin({
        template:'./src/template/test.html',
        filename:'test.html',
        chunks:['test']
    })
]
//公用css loader
const commonCssLoader =[MiniCssExtractPlugin.loader,'css-loader', {
    loader: 'postcss-loader',
    options: {
        postcssOptions:{
            config:true
        }
    },
  },
]
module.exports={
    target: 'web',
    entry:{
        ...commonEntry
    },
    output:{
        filename:'js/[name].bundle.js',
        path:pahtResolve('package'),
        assetModuleFilename: 'images/[hash:8][ext][query]',
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
        //删除未使用css
        new PurgecssPlugin({
            paths: glob.sync(`./src/**/*`,{ nodir: true }),
            //  paths: glob.sync([])
          }),
        new MiniCssExtractPlugin({filename:'css/[name].css',chunkFilename:'[name].chunk.css'}),
        ...commonAddNewPage
    ],
    
}