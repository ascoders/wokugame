import * as webpack from 'webpack'
import * as path from 'path'

import * as config from '../../config'
import BundleProductionChangeHtmlHash from './plugins/bundle-production-change-html-hash'
import * as autoprefixer from 'autoprefixer'

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
        rules: [
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

    postcss: function () {
        return [autoprefixer]
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
        new BundleProductionChangeHtmlHash()
    ]
}