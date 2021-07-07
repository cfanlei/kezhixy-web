# 说明
## 1.开发环境依赖
```js
    "autoprefixer": "^10.2.6",
    "purgecss-webpack-plugin": "^4.0.3",
    "tailwindcss": "^2.2.4",
    "@types/lodash": "^4.14.171",
    "css-loader": "^5.2.6",
    "css-minimizer-webpack-plugin": "^3.0.2",
    "html-webpack-plugin": "^5.3.2",
    "mini-css-extract-plugin": "^2.1.0",
    "postcss": "^8.3.5",
    "postcss-loader": "^6.1.1",
    "sass": "^1.35.1",
    "sass-loader": "^12.1.0",
    "terser-webpack-plugin": "^5.1.4",
    "ts-loader": "^9.2.3",
    "typescript": "^4.3.5",
    "webpack": "^5.43.0",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2",
    "webpack-merge": "^5.8.0"
```
## 2.框架(技术栈)
* tailwindcss (不熟悉的小伙伴请上官网 [tailwindcss](https://www.tailwindcss.cn/))
* typescript(跟上节奏,迈着步伐 [TS文档](https://www.tslang.cn/docs/home.html))

## 3.项目说明
* 目的 : 为多页网站搭建一个工程化的模板,减少对构建花费的时间
* 开箱即用,快速开发
* 利于官网等传统网站开发,并不推荐管理系统等单页应用
* 项目开发环境和生产环境现在是可以直接使用,后续优化~
* 尚未配置代码格式化(如有需要请自己手动配置)
# 使用说明
## 1.目录说明
```js
assets  -- 静态资源
css    --sass资源
template --html页面（webpack将其作为模板生成新的html）
ts  --ts源码
```
## 2.新增网页
~ 案例 :新增test.html,需要引入test.scss,test.ts

**解决方案**
* 1.创建test.html,test.scss,test.ts
* 2.webpack.common.js 修改如下
```js
//step 1

const commonEntry={
    //添加test.html路径
    test:'./src/ts/test.ts'
}
//step 2

const commonAddNewPage=[
    //新增
    new HtmlWebpackPlugin({
        template:'./src/template/test.html',
        filename:'test.html',
        chunks:['test']
    })
]
//step 3

//test.ts 引入scss
import '@/css/test'

//若test.html中使用tailwindcss,在test.ts中添加 
import "tailwindcss/tailwind.css"
```
* 大功告成！！

# npm/yarn命令

* yarn install /npm install  下载依赖包
* yarn start  /npm run start 开发环境运行
* yarn build / npm run build 生产环境打包

# issues
* 好的建议欢迎issues

# 版权及商用
* 一切免费,无版权！