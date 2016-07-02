var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'eval',

    entry: [
        path.join(process.cwd(), 'client', 'index.tsx')
    ],

    output: {
        filename     : 'index.js',
        path         : path.join(__dirname, '../output/bundle'),
        chunkFilename: '[name].chunk.js'
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.tsx', '.json']
    },

    module: {
        loaders: [
            {
                test   : /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['ts', 'html-path-loader']
            }, {
                test   : /\.scss/,
                exclude: /node_modules/,
                loaders: ['style', 'css', 'autoprefixer', 'sass', 'css-path-loader']
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
    }
}
