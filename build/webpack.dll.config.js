// 使用dll抽离第三方模块
const path =require('path');
const Webpack = require('webpack');
module.exports = {
    entry:{
        vendor:['vue']
    },
    output:{
        path:path.resolve(__dirname,'static/js'), // 打包后文件输出的位置
        filename:'[name].dll.js',
        library:'[name]_library'
    },
    plugins:[
        new Webpack.DllPlugin({
            path:path.resolve(__dirname,'[name]-mainfest.json'),
            name:'[name]_library',
            context:__dirname
        })
    ]
}