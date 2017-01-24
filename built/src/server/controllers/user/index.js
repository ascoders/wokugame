"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const models_1 = require("../../models");
const utils = require("../../../../components/node-utils");
const router = express.Router();
const wrap = (fn) => (...args) => fn(...args).catch(args[2]);
router.route('/users')
    .get((req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield models_1.User.findAndCountAll({
        offset: 0,
        limit: 20
    });
    res.send(result);
}))
    .post(wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield models_1.User.create({
        nickname: req.body.nickname,
        password: utils.md5(req.body.password)
    });
    res.send(result);
})));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=index.js.map