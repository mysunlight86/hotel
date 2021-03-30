const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
        main: './pages/index.js',
        analytics: './pages/analytics.js',
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
    plugins: [
        // new HTMLWebpackPlugin({
        //     favicon: './favicon.ico',
        //     template: './pages/index.html',
        // }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src/favicon.ico'),
        //             to: path.resolve(__dirname, 'dist/assets'),
        //         }
        //     ]
        // }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        ...PAGES.map(page => new HTMLWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
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
                test: /\.(png|svg|jpg|gif|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                }
            },
            {
                test: /\.(ttf|woff(2)?|eot|otf)$/i,
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
                // exclude: /node_modules/,
                use: 'pug-loader',
            },
        ],
    }
};
