const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝静态资源  直接拷贝文件
const devMode = process.argv.indexOf('--mode==production')
const firstPlugin = require('./webpack-firstPlugin')
module.exports = {
    entry: ["@babel/polyfill",path.resolve(__dirname, '../src/main.js')],
    output: {
        filename: '[name][hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    // devServer:{
    //     port:3000,
    //     hot:true,
    //     contentBase:path.resolve(__dirname, '../dist')
    // },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                'autoprefixer' // 用于给样式加上浏览器前缀 需要配合browserList使用 做兼容
                            ],
                        },
                    }
                }] // 从右向左解析原则
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                'autoprefixer'
                            ],
                        },
                    }
                }, 'less-loader'] // 从右向左解析原则
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            }
        
        ]
    },
    plugins: [
        new firstPlugin(),
        new Webpack.DllReferencePlugin({
            context:__dirname,
            manifest:require('./vendor-mainfest.json')
        }),
        new CopyWebpackPlugin({
            patterns:[{from:  path.resolve(__dirname,'./static'), to:path.resolve(__dirname,'../dist/static')}]
        }),
        // 将打包后的资源自动注入HTML
        new HtmlWepackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode? '[name].css': "[name].[hash].css",
            chunkFilename: devMode?"[id].css":"[id].[hash].css"
        }),
        new vueLoaderPlugin(),
    ],
    resolve:{
        // 通过别名直接告诉webpack去哪个路径下查找
        alias:{
            'vue$':"vue/dist/vue.runtime.esm.js",
            " @":path.resolve(__dirname,'../src')
        },
        extensions:['*','.js','.json','.vue']
    }
}