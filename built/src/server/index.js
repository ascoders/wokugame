"use strict";
const koa = require("koa");
const config = require("../../config");
const staticCache = require("koa-static-cache");
const graphql_server_koa_1 = require("graphql-server-koa");
const schema_1 = require("../graphql/schema");
const Router = require("koa-router");
const html_1 = require("../client/html");
require("./models");
const app = new koa();
const proxy = require('koa-proxy');
const router = new Router();
const builtStaticPath = process.env.NODE_ENV === 'production' ? 'built-production/static' : 'built/static';
app.use(staticCache(`${builtStaticPath}`, {
    prefix: '/static',
    maxAge: 365 * 24 * 60 * 60,
    buffer: true,
    gzip: true,
    usePrecompiledGzip: true
}));
app.on('error', (err) => {
    if (err) {
        console.log('error:', err);
    }
});
process.on('uncaughtException', (err) => {
    if (err) {
        console.log('error:', err);
    }
});
router.get('*', function* () {
    this.type = 'text/html; charset=utf-8';
    this.body = html_1.default;
});
router.post('/graphql', graphql_server_koa_1.graphqlKoa({ schema: schema_1.default }));
app.use(router.routes());
module.exports = app.listen(config.localPort);
//# sourceMappingURL=index.js.map