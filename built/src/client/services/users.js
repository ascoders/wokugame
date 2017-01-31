"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fetch_1 = require("../utils/fetch");
exports.create = (options) => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/users', {
        method: 'post',
        body: JSON.stringify({
            nickname: options.nickname,
            password: options.password
        })
    });
});
exports.login = (options) => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            nickname: options.nickname,
            password: options.password
        })
    });
});
exports.getAuthenticatedUser = () => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/user', {
        method: 'get'
    });
});
exports.logOut = () => __awaiter(this, void 0, void 0, function* () {
    return yield fetch_1.default('/api/user', {
        method: 'delete'
    });
});
//# sourceMappingURL=users.js.map