const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist')
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
                exclude: path.resolve(__dirname, 'src/assets/icons')
            },
            {
                test: /\.svg$/,
                use: 'svg-sprite-loader',
                include: path.resolve(__dirname, 'src/assets/icons')
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
            '@': path.resolve(__dirname, 'src'),
            'images': path.resolve(__dirname, 'src/assets/images'),
        }
    }
};

module.exports = (env, argv) => {
    config.mode = argv.mode === 'production' ? 'production' : 'development';

    if (config.mode === 'development') {
        config.devtool = "inline-source-map";
        config.output.filename = '[name].bundle.js';
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.devServer = {
            contentBase: './dist',
            hot: true
        };
    }

    if (config.mode === 'production') {
        config.output.filename = '[name].[contenthash].js';
    }

    return config;
};