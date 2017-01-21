"use strict";
exports.localPort = 8080;
exports.localWebpackPort = 9091;
exports.deployPort = 8000;
exports.publicPath = 'static';
exports.dbHostName = process.env['production'] ? 'db' : 'localhost';
exports.webpackDlls = [
    'react',
    'react-dom',
    'react-router',
    'react-router-redux',
    'redux',
    'lodash',
    'classnames',
    'seamless-immutable',
    'rxjs'
];
exports.staticPathPrefixProduction = '/';
//# sourceMappingURL=config.js.map