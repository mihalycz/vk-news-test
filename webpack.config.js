const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const parts = require('./webpack.parts');
const devSetup = parts.devSetup();
const prodSetup = parts.prodSetup();
const libraryName =  'SiteEnvironment';

const mainConfig = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    module: {
        loaders: [
            { test: /\.cssl$/, loader: 'css-loader'},
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.html$/, loader: 'html-loader'},
        ]
    },
    output: {
        filename: `js/${libraryName}.[name].bundle.js`,
        libraryTarget: "var",
        library: [libraryName, "[name]"],
    },
    plugins: [
        new CopyWebpackPlugin([{ from: './src/modules-helper.js', to: 'js/modules-helper.js' }]),
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
    ],
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.tsx', '.ts', '.js', '.json']
    }
};

module.exports = function(env) {
    switch (env) {
        case 'production':
            return merge(mainConfig, prodSetup);
        default:
            return merge(mainConfig, devSetup);
    }
};
