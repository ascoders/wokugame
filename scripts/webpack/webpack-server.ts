import * as webpackDevServer from 'webpack-dev-server'
import * as webpack from 'webpack'
import webpackDevConfig from './webpack.dev.config'
import * as config from '../../config'
import * as fs from 'fs'
import * as path from 'path'

const server = new webpackDevServer(webpack(webpackDevConfig), {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    compress: true,
    historyApiFallback: true
})

server.listen(config.localWebpackPort, 'localhost', function () {
})