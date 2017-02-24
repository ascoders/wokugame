"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require("webpack");
const path = require("path");
const config = require("../../config");
const bundle_production_change_html_hash_1 = require("./plugins/bundle-production-change-html-hash");
exports.default = {
    entry: [
        './built/src/client/index.js'
    ],
    output: {
        path: 'built-production/static',
        publicPath: `${path.join(config.staticPathPrefixProduction, config.publicPath).replace(/http:\//g, 'http://')}/`,
        filename: 'bundle.[hash:5].js?',
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.join(process.cwd(), 'built-production/static/dll/library-mainfest.json'))
        }),
        new bundle_production_change_html_hash_1.default()
    ]
};
//# sourceMappingURL=webpack.production.config.js.map