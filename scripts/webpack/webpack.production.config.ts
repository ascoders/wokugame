import * as webpack from 'webpack'
import * as path from 'path'

import * as config from '../../config'
import * as happyPack from 'happypack'
import BundleProductionChangeHtmlHash from './plugins/bundle-production-change-html-hash'

const happyThreadPool = happyPack.ThreadPool({size: 5})

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSCSS = new ExtractTextPlugin('style.css')

export function createHappyPlugin(id: string, loaders: string[]) {
    return new happyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool,
        cache: process.env.HAPPY_CACHE === '1',
        verbose: process.env.HAPPY_VERBOSE === '1'
    })
}

export default {
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
        createHappyPlugin('text', ['text']),
        new BundleProductionChangeHtmlHash()
    ]
}