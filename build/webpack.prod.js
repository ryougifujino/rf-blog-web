const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const COMMON_JS = require('../src/common/common-cdn');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "RF THE BLOG",
            template: "./index.html",
            COMMON_JS
        })
    ],
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'markdown-it': 'markdownit',
        'ace-builds': 'ace'
    }
});
