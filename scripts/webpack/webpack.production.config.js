var path = require('path')
var webpack = require('webpack')
var dllPlugins = require('./dll-plugins')
var extractTextPlugin = require('extract-text-webpack-plugin')

var config = {
    entry: path.join(process.cwd(), 'client', 'index.tsx'),

    output: {
        filename  : '[name].bundle.js',
        publicPath: '/static/bundle/',
        path      : path.join(process.cwd(), 'output/static/bundle')
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.tsx', '.json']
    },

    module: {
        loaders: [
            {
                test   : /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['babel', 'ts', 'html-path']
            }, {
                test   : /\.scss/,
                exclude: /node_modules/,
                loaders: ['style', 'css', 'autoprefixer', 'sass', 'css-path']
            },
            {
                test   : /\.scss/,
                include: /node_modules/,
                loaders: ['style', 'css', 'autoprefixer', 'sass']
            }, {
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
    },

    plugins: [
        new extractTextPlugin('style.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}

dllPlugins.forEach(function (item) {
    config.plugins.push(item)
})

module.exports = config