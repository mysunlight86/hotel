'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// const NODE_ENV = process.env.NODE_ENV || 'development';
// const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
// console.log('IS DEV: ', isDev);

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    // mode: NODE_ENV,
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext]'
    },
    resolve: {
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        // minimize: true,
        minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin(),
        ]
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'test',
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist/assets')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    experiments: {
        asset: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    }, 
                    'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    }, 
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                type: 'asset/resource',
                // use: ['file-loader'],
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            // {
            //     test: /\.ico$/i,
            //     type: 'asset/source',
            //     generator: {
            //         filename: 'assets/[name][ext]'
            //     }
            // },
            {
                test: /\.svg/,
                type: 'asset/resource',
                use: ['svgo-loader'],
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                // test: /\.js$/,
                // exclude: /node_modules/,
                // use: ['babel-loader'],
            }
        ],
    }

    // watch: NODE_ENV === 'development',

    // watchOptions: {
    //     aggregateTimeout: 100
    // },

    // devtool: NODE_ENV === 'development' ? 'inline-cheap-module-source-map' : undefined,
};
