'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: './home',
    output: {
        filename: 'build.js',
        library: 'home'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: 'source-map'
};
