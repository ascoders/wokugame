"use strict";
const path = require("path");
const webpack = require("webpack");
const config = require("../../config");
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
        })
    ],
    module: {
        loaders: [
            {
                test: /\.css/,
                loaders: ['style', 'css']
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: `url?limit=1024&name=img/[name].[hash:5].[ext]`
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: `url?limit=1024&name=font/[name].[hash:5].[ext]`
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
//# sourceMappingURL=webpack.dll.production.config.js.map