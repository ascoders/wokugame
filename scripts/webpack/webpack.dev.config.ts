import * as webpack from 'webpack'
import * as config from '../../config'
import * as path from 'path'
import * as happyPack from 'happypack'

const happyThreadPool = happyPack.ThreadPool({size: 5})

declare module 'webpack' {
    interface Webpack {
        DllReferencePlugin: any
    }
}

export function createHappyPlugin(id: string, loaders: string[]) {
    return new happyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool,
        cache: process.env.HAPPY_CACHE === '1',
        verbose: process.env.HAPPY_VERBOSE === '1'
    })
}

const webpackConfig = {
    debug: true,

    entry: [
        `webpack-dev-server/client?http://localhost:${config.localWebpackPort}`,
        'webpack/hot/only-dev-server',
        './built/src/client/index.js'
    ],

    output: {
        path: __dirname,
        publicPath: `http://localhost:${config.localWebpackPort}/`,
        filename: 'bundle.js'
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
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            columns: false
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.join(process.cwd(), 'built/static/dll/library-mainfest.json'))
        }),
        createHappyPlugin('js', ['react-hot']),
        createHappyPlugin('css', ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]']),
        createHappyPlugin('image', ['url?limit=3000&name=img/[hash:8].[name].[ext]']),
        createHappyPlugin('font', ['url?limit=3000&name=font/[hash:8].[name].[ext]']),
        createHappyPlugin('json', ['json']),
        createHappyPlugin('text', ['text'])
    ]
}

export default webpackConfig