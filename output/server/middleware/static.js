"use strict";
const staticCache = require('koa-static-cache');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return staticCache('output/static', {
        prefix: '/static',
        maxAge: 365 * 24 * 60 * 60,
        buffer: true,
        gzip: true,
        usePrecompiledGzip: true
    });
};
