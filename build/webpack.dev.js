const Webpack = require('webpack');
const webpackConfig = require('./webpack.config.js')
const {merge} = require('webpack-merge')

module.exports = merge(webpackConfig,{
    mode:'development',
    devtool:'source-map',
    devServer:{
        port:3000,
        hot:true,
        contentBase:'../dist'
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ]
})