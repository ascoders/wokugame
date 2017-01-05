"use strict";
const webpack = require("webpack");
const path = require("path");
const config = require("../../config");
const happyPack = require("happypack");
const happyThreadPool = happyPack.ThreadPool({ size: 5 });
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSCSS = new ExtractTextPlugin('style.css');
function createHappyPlugin(id, loaders) {
    return new happyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool,
        cache: process.env.HAPPY_CACHE === '1',
        verbose: process.env.HAPPY_VERBOSE === '1'
    });
}
exports.createHappyPlugin = createHappyPlugin;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    debug: false,
    entry: [
        './built/src/client/index.js'
    ],
    output: {
        path: 'built-production/static',
        publicPath: `${path.join(config.staticPathPrefixProduction, config.publicPath).replace(/http:\//g, 'http://')}/`,
        filename: 'bundle.[hash:5].js?',
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)?$/,
                exclude: [/node_modules/],
                loader: 'happypack/loader?id=js'
            }, {
                test: /\.(css)/,
                loader: 'happypack/loader?id=css'
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'happypack/loader?id=image'
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)/,
                loader: 'happypack/loader?id=font'
            }, {
                test: /\.json$/,
                loader: 'happypack/loader?id=json'
            }, {
                test: /\.md$/,
                loader: 'happypack/loader?id=text'
            }
        ]
    },
    plugins: [
        extractSCSS,
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
        createHappyPlugin('js', ['babel']),
        createHappyPlugin('css', ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]']),
        createHappyPlugin('image', ['url?limit=3000&name=img/[hash:8].[name].[ext]']),
        createHappyPlugin('font', ['url?limit=3000&name=font/[hash:8].[name].[ext]']),
        createHappyPlugin('json', ['json']),
        createHappyPlugin('text', ['text'])
    ]
};
//# sourceMappingURL=webpack.production.config.js.map