"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.localPort = 8080;
exports.localWebpackPort = 9091;
exports.deployPort = 8000;
exports.publicPath = 'static';
exports.dbHostName = process.env.NODE_ENV === 'production' ? 'db' : 'localhost';
exports.dbPort = process.env.NODE_ENV === 'production' ? 3306 : 5002;
exports.redisHostName = process.env.NODE_ENV === 'production' ? 'redis' : 'localhost';
exports.redisPort = process.env.NODE_ENV === 'production' ? 6379 : 5001;
exports.logDirectory = path.join(__dirname, 'log');
exports.sessionSecret = '0IX2wWinvk9IdidQEhHMkZNAlBLT54';
const dayTime = 1000 * 60 * 60 * 24;
exports.sessionMaxAge = dayTime * 365 / 12 * 2;
exports.webpackDlls = [
    'react',
    'react-dom',
    'react-router'
];
exports.staticPathPrefixProduction = '/';
//# sourceMappingURL=config.js.map