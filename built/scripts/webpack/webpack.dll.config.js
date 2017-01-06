"use strict";
const path = require("path");
const webpack = require("webpack");
const config_1 = require("../../config");
module.exports = {
    entry: {
        library: config_1.webpackDlls
    },
    output: {
        filename: 'dll/[name].dll.js',
        path: path.join(__dirname, '../../static'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../../static/dll', '[name]-mainfest.json'),
            name: '[name]'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.css/,
                loaders: ['style', 'css']
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=1024&name=dll/img/[hash:8].[name].[ext]'
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url?limit=1024&name=dll/font/[hash:8].[name].[ext]'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
//# sourceMappingURL=webpack.dll.config.js.map