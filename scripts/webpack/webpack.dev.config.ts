import * as webpack from 'webpack'
import * as config from '../../config'
import * as path from 'path'

declare module 'webpack' {
    interface Webpack {
        DllReferencePlugin: any
    }
    interface Optimize {
        AggressiveSplittingPlugin: any
    }
}

export default {
    devtool: 'cheap-module-source-map' as 'cheap-module-source-map',

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
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: [/node_modules/],
                use: ['react-hot-loader']
            }, {
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

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.join(process.cwd(), 'built/static/dll/library-mainfest.json'))
        })
    ]
}