"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const webpack = require("webpack");
const config_1 = require("../../config");
exports.default = {
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
        rules: [
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader?limit=1024&name=dll/img/[hash:8].[name].[ext]']
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use: ['url-loader?limit=1024&name=dll/font/[hash:8].[name].[ext]']
            }, {
                test: /\.json$/,
                use: ['json-loader']
            }
        ]
    }
};
//# sourceMappingURL=webpack.dll.config.js.map