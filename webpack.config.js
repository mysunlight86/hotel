'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');

// const NODE_ENV = process.env.NODE_ENV || 'development';
// const webpack = require('webpack');

module.exports = {
    // mode: NODE_ENV,
    mode: 'development',
    entry: {
        main: './src/index.js',
        analytics: './src/analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'test',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],

    // watch: NODE_ENV === 'development',

    // watchOptions: {
    //     aggregateTimeout: 100
    // },

    // devtool: NODE_ENV === 'development' ? 'inline-cheap-module-source-map' : undefined,

    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/,
    //             use: ['babel-loader'],
    //         },
    //     ],
    // }
};
