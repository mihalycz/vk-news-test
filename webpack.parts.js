const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const WebpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaders = [
    { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!less-loader' })},
    { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff", options: {name: 'fonts/[hash].[ext]'} },
    { test: /\.ttf$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
    { test: /\.eot$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
    { test: /\.svg$/, loader: "file-loader", options: {name: 'fonts/[hash].[ext]'} },
    { test: /\.hbs$/, loader: "handlebars-loader", query: {
        partialDirs: [
            path.join(__dirname, 'src', 'partials')
        ]
    } },
    { test: /\.jpe?g$|\.gif$|\.png$|\.svg$/, loader: "file-loader", options: {name: 'images/[hash].[ext]'} }
];

const getPages = function () {
    const pagesFolder = './src/pages/';
    const pagesFolders = fs.readdirSync(pagesFolder).filter(file => fs.statSync(path.join(pagesFolder, file)).isDirectory());
    return pagesFolders.map((folderName) => {
        return new HtmlWebpackPlugin({
            template: `${pagesFolder + folderName}/${folderName}.hbs`,
            filename: `${folderName}.html`,
            inject: 'head'
        })
    });
};

exports.devSetup = function() {
    return {
        output: {
            path: './dev',
        },
        module: {
            loaders: loaders
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new ExtractTextPlugin({ filename: 'css/[name].styles.css', disable: false, allChunks: true })
        ].concat(getPages()),
        devtool: '#inline-source-map',
    };
};

exports.prodSetup = function() {
    return {
        module: {
            loaders: loaders
        },
        plugins: [
            new OptimizeCSSAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions:  {
                    discardComments: {
                        removeAll: true,
                    },
                    safe: true,
                }
            }),
            new WebpackUglifyJsPlugin({
                cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
                debug: true,
                minimize: true,
                sourceMap: false,
                output: {
                    comments: false
                },
                compressor: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new ExtractTextPlugin({ filename: 'css/[name].styles.css', disable: false, allChunks: true })
        ].concat(getPages()),
        output: {
            path: './build',
        },
    };
};