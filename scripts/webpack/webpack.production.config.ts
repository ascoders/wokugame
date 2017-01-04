import * as webpack from 'webpack'
import * as path from 'path'

import * as config from '../../config'
import * as happyPack from 'happypack'
import {createHappyPlugin} from './webpack.dev.config'

const happyThreadPool = happyPack.ThreadPool({size: 5})

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSCSS = new ExtractTextPlugin('style.css')

const webpackConfig = {
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
}

export default webpackConfig