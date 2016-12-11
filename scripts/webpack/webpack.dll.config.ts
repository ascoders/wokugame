import * as path from 'path'
import * as webpack from 'webpack'
import dllLists from './dlls'

module.exports = {
    entry: {
        library: dllLists
    },

    output: {
        filename: 'static/dll/[name].dll.js',
        path: path.join(__dirname, '../../output'),
        library: '[name]'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../../output/static/dll', '[name]-mainfest.json'),
            name: '[name]'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.css/,
                loaders: ['style', 'css']
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=1024&name=static/dll/img/[hash:8].[name].[ext]'
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url?limit=1024&name=static/dll/font/[hash:8].[name].[ext]'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
}