const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

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
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new CopyPlugin([
            {from: 'public', to: 'public'}
        ])
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'images': path.resolve(__dirname, '../src/assets/images'),
        }
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
};
