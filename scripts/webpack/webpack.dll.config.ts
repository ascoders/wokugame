import * as path from 'path'
import * as webpack from 'webpack'
import {webpackDlls} from '../../config'

declare module 'webpack' {
    interface Webpack {
        DllPlugin: any
    }
}

export default {
    entry: {
        library: webpackDlls
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
}