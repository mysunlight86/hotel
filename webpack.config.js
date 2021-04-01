const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const PATHS = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
}
  
const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
    context: PATHS.src,
    mode: 'development',
    entry: {
        main: './index.js',
    },
    output: {
        filename: filename('js'),
        path: PATHS.dist,
        publicPath: '',
        assetModuleFilename: 'assets/[name][ext]',
    },
    resolve: {
        alias: {
            '@components': `${PATHS.src}/components`,
            '@': PATHS.src,
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin(),
        ]
    },
    devServer: {
        contentBase: PATHS.dist,
        compress: true,
        port: 4200,
        watchContentBase: true,
        overlay: {
            warnings: true,
            errors: true,
        },
    },
    devtool: isDev ? 'inline-cheap-module-source-map' : false,
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery':'jquery',
            'window.$': 'jquery'
          }),
        ...PAGES.map(page => new HTMLWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`,
            favicon: './favicon.ico',
        })),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    'postcss-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    }, 
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                }
            },
            {
                test: /\.(ttf|woff(2)?|eot|otf|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.pug$/i,
                use: 'pug-loader',
            },
        ],
    }
};
