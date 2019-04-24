const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.s?css$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|gif|svg|png)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "rf's Blog",
            template: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'images': path.resolve(__dirname, 'src/assets/images'),
        }
    },
    devServer: {
        contentBase: './dist',
        hot: true
    }
};
