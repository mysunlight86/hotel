'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');

// const NODE_ENV = process.env.NODE_ENV || 'development';
// const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    // mode: NODE_ENV,
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
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
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'test',
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
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
