const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    output: {
        filename: '[name].bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "RF THE BLOG",
            template: "./index.html"
        })
    ],
    devServer: {
        contentBase: '../dist',
        hot: true
    }
});
