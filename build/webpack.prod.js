const path = require('path');
const webpackConfig = require('./webpack.config.js')
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝静态资源  直接拷贝文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackConfig, {
    mode: "production",
    devtool: 'hidden-source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns:
                [{
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist'),
                }]
        }),
        new BundleAnalyzerPlugin({
            analyzerHost:'127.0.0.1',
            analyzerPort:8889
        })
    ],
    // 优化
    optimization: {
        minimizer: [ // 压缩js
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ],
        // 将重复引用的包单独分离出来 避免重复打包
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // 只打包初始依赖的第三方
                }
            }
        }
    }
})
