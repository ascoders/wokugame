var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        react: ['react', 'react-dom', 'react-router', 'redux-immutablejs', 'react-router-redux'],
        fit  : ['fit-input', 'fit-isomorphic-redux-tools'],
        tools: ['validator']
    },

    output: {
        filename: '[name].dll.js',
        path    : path.join(process.cwd(), 'output/static/dll'),
        library : '[name]'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name    : 'react-common',
            fileName: 'react-common.dll.js',
            chunks  : ['react', 'fit']
        }),
        new webpack.DllPlugin({
            path: path.join(process.cwd(), 'output/static/dll', '[name]-mainfest.json'),
            name: '[name]'
        })
    ],

    module: {
        loaders: [
            {
                test   : /\.css/,
                loaders: ['style', 'css']
            }, {
                test  : /\.(png|jpg)$/,
                loader: 'url?limit=3000&name=img/[hash:8].[name].[ext]'
            }, {
                test  : /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url?limit=3000&name=font/[hash:8].[name].[ext]'
            }, {
                test  : /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
}
