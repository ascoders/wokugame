"use strict";
const path = require("path");
exports.localPort = 8080;
exports.localWebpackPort = 9091;
exports.deployPort = 8000;
exports.publicPath = 'static';
exports.dbHostName = process.env.NODE_ENV === 'production' ? 'db' : 'localhost';
exports.dbPort = 3306;
exports.logDirectory = path.join(__dirname, 'log');
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