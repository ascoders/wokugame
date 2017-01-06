import * as path from 'path'
import * as webpack from 'webpack'
import * as config from '../../config'
import DllProductionChangeHtmlHash from './plugins/dll-production-change-html-hash'

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
        new DllProductionChangeHtmlHash()
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
}