"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const routes_1 = require('../../client/routes');
const reducer_1 = require('../../client/reducer');
const fit_isomorphic_redux_tools_1 = require('fit-isomorphic-redux-tools');
const fs = require('fs');
const path = require('path');
const htmlText = fs.readFileSync(path.join(__dirname, '../../client/index.html'), 'utf-8');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => __awaiter(this, void 0, void 0, function* () {
    fit_isomorphic_redux_tools_1.serverRender({
        req: req,
        res: res,
        routes: routes_1.default,
        basename: '',
        rootReducer: reducer_1.default,
        htmlText: htmlText,
        enableServerRender: true
    });
});
