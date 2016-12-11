import * as webpackDevServer from 'webpack-dev-server'
import * as webpack from 'webpack'
import webpackDevConfig from './webpack.dev.config'
import * as config from '../../config'

const server = new webpackDevServer(webpack(webpackDevConfig), {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    promiseMiddleware: true
})

server.listen(config.localWebpackPort, 'localhost', function () {
})