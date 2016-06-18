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
const fit_isomorphic_redux_tools_1 = require('fit-isomorphic-redux-tools');
const fs = require('fs');
const path = require('path');
const app = new Koa();
const htmlText = fs.readFileSync(path.join(__dirname, '../client/index.html'), 'utf-8');
app.use((ctx) => __awaiter(this, void 0, void 0, function* () {
    const result = yield fit_isomorphic_redux_tools_1.serverRenderValue({
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
