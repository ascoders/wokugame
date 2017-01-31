"use strict";
const path = require("path");
exports.localPort = 8080;
exports.localWebpackPort = 9091;
exports.deployPort = 8000;
exports.publicPath = 'static';
exports.dbHostName = process.env.NODE_ENV === 'production' ? 'db' : 'localhost';
exports.dbPort = 3306;
exports.redisHostName = process.env.NODE_ENV === 'production' ? 'redis' : 'localhost';
exports.redisPort = 6379;
exports.logDirectory = path.join(__dirname, 'log');
exports.sessionSecret = '0IX2wWinvk9IdidQEhHMkZNAlBLT54';
const dayTime = 1000 * 60 * 60 * 24;
exports.sessionMaxAge = dayTime * 365 / 12 * 2;
exports.webpackDlls = [
    'react',
    'react-dom',
    'react-router',
    'mobx',
    'mobx-react',
    'lodash',
    'rxjs'
];
exports.staticPathPrefixProduction = '/';
//# sourceMappingURL=config.js.map