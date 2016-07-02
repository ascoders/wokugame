"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Koa = require('koa');
const routes_1 = require('../client/routes');
const reducer_1 = require('../client/reducer');
const server_render_value_1 = require('fit-isomorphic-redux-tools/lib/server-render-value');
const service_1 = require('fit-isomorphic-redux-tools/lib/service');
const fs = require('fs');
const path = require('path');
const require_folder_index_1 = require('./utils/require-folder-index');
const _ = require('lodash');
const Router = require('koa-router');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const static_1 = require('./middleware/static');
const covert = require('koa-convert');
const app = new Koa();
app.use(covert(static_1.default()));
app.use(covert(session(app)));
app.use(covert(bodyParser()));
require_folder_index_1.default(path.join(__dirname, 'modules'));
const router = new Router();
for (var key of service_1.default.keys()) {
    const service = service_1.default.get(key);
    const callback = (ctx) => __awaiter(this, void 0, void 0, function* () {
        let params = _.assign(ctx.body || {}, ctx.query || {});
        ctx.body = yield service.value(params, ctx);
    });
    switch (service.method) {
        case 'get':
            router.get(key, callback);
            break;
        case 'post':
            router.post(key, callback);
            break;
    }
}
app.use(router.routes());
const htmlText = fs.readFileSync(path.join(__dirname, '../client/index.html'), 'utf-8');
app.use((ctx) => __awaiter(this, void 0, void 0, function* () {
    const result = yield server_render_value_1.default({
        req: ctx.req,
        routes: routes_1.default,
        basename: '',
        rootReducer: reducer_1.default,
        htmlText: htmlText,
        enableServerRender: true
    });
    ctx.body = result.result;
    ctx.type = 'html';
}));
app.listen(8080);
