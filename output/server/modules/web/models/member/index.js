"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const validator = require('validator');
const schema_1 = require('./schema');
exports.authentication = (account, password) => {
};
exports.FindByAccount = (account) => __awaiter(this, void 0, void 0, function* () {
    if (validator.isEmail(account)) {
        const emailResult = yield schema_1.default.findOne({
            where: {
                email: account
            }
        });
        console.log(emailResult);
    }
    return yield schema_1.default.findOne({
        where: {
            nickname: account
        }
    });
});
