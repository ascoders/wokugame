var path = require('path')
var webpack = require('webpack')

module.exports = {
    debug  : true,

    entry: [
        'webpack-dev-server/client?http://localhost:8090',
        'webpack/hot/only-dev-server',
        path.join(process.cwd(), 'client', 'index.tsx')
    ],

    output: {
        filename  : 'index.js',
        path      : path.join(__dirname, 'output/client'),
        publicPath: 'http://localhost:8090/'
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context : '.',
            manifest: require(path.join(process.cwd(), 'output/static/dll/react-mainfest.json'))
        }),
        new webpack.DllReferencePlugin({
            context : '.',
            manifest: require(path.join(process.cwd(), 'output/static/dll/fit-mainfest.json'))
        }),
        new webpack.DllReferencePlugin({
            context : '.',
            manifest: require(path.join(process.cwd(), 'output/static/dll/tools-mainfest.json'))
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            columns: false
        })
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.tsx', '.json']
    },

    module: {
        loaders: [
            {
                test   : /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'ts', 'html-path-loader']
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