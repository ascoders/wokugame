"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const webpack = require("webpack");
const config = require("../../config");
const dll_production_change_html_hash_1 = require("./plugins/dll-production-change-html-hash");
module.exports = {
    entry: {
        library: config.webpackDlls
    },
    output: {
        filename: '[name].[hash:5].dll.js',
        path: 'built-production/static/dll',
        publicPath: `${path.join(config.staticPathPrefixProduction, config.publicPath).replace(/http:\//g, 'http://')}/dll/`,
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'built-production/static/dll/[name]-mainfest.json',
            name: '[name]'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false
        }),
        new dll_production_change_html_hash_1.default()
    ],
    module: {
        rules: [
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 3000,
                        name: 'img/[hash:8].[name].[ext]'
                    }
                }
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 3000,
                        name: 'img/[hash:8].[name].[ext]'
                    }
                }
            }, {
                test: /\.json$/,
                use: ['json-loader']
            }, {
                test: /\.md$/,
                use: ['text-loader']
            }
        ]
    }
};
//# sourceMappingURL=webpack.dll.production.config.js.map