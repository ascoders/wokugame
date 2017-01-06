"use strict";
const webpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const webpack_dev_config_1 = require("./webpack.dev.config");
const config = require("../../config");
const server = new webpackDevServer(webpack(webpack_dev_config_1.default), {
    publicPath: webpack_dev_config_1.default.output.publicPath,
    hot: true,
    historyApiFallback: true,
    promiseMiddleware: true
});
server.listen(config.localWebpackPort, 'localhost', function () {
});
//# sourceMappingURL=webpack-server.js.map