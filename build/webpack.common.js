const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist')
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
                use: 'file-loader',
                exclude: path.resolve(__dirname, '../src/assets/icons')
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader',
                include: path.resolve(__dirname, '../src/assets/icons')
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "rf's Blog",
            template: "./index.html"
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'images': path.resolve(__dirname, '../src/assets/images'),
        }
    }
};