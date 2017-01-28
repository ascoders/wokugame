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
const db_1 = require("../../db");
const user_1 = require("../../entitys/user");
const utils = require("../../../../components/node-utils");
const router = express.Router();
const wrap = (fn) => (...args) => fn(...args).catch(args[2]);
router.get('/users', wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    const page = Number(req.body.page) || 1;
    const total = Number(req.body.total) || 20;
    if (page < 1) {
        return res.status(400).send({
            message: '参数 page 不能小于 1'
        });
    }
    if (total < 1 || total > 100) {
        return res.status(400).send({
            message: '参数 total 范围必须在 1 ~ 100 之间'
        });
    }
    const UsersRepository = (yield db_1.default).getRepository(user_1.default);
    const result = yield UsersRepository
        .createQueryBuilder('user')
        .select(['user.id as user_id', 'user.nickname as user_nickname'])
        .setLimit(total)
        .setOffset(total * (page - 1))
        .getManyAndCount();
    res.send({
        rows: result[0],
        count: result[1]
    });
})));
router.post('/users', wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    const UsersRepository = (yield db_1.default).getRepository(user_1.default);
    const user = new user_1.default();
    user.nickname = req.body.nickname;
    user.password = utils.md5(req.body.password);
    user.passwordRetry = 0;
    const result = yield UsersRepository.persist(user);
    delete result.password;
    res.send(result);
})));
router.post('/users/login', wrap((req, res) => __awaiter(this, void 0, void 0, function* () {
    const UsersRepository = (yield db_1.default).getRepository(user_1.default);
    const user = yield UsersRepository
        .createQueryBuilder('user')
        .where(`user.nickname=${req.body.nickname}`)
        .getOne();
    const retryCount = 9;
    const waitTime = 60;
    if (!user) {
        return res.status(404).send({
            message: '用户不存在'
        });
    }
    if (user.passwordRetry === retryCount) {
        if (new Date().getTime() - user.updated.getTime() >= waitTime * 1000) {
            user.passwordRetry = 0;
            yield UsersRepository.persist(user);
        }
        else {
            const remainingTime = waitTime - Math.floor((new Date().getTime() - user.updated.getTime()) / 1000);
            return res.status(403).send({
                message: `密码重试次数达到上限，还需等待 ${remainingTime} 秒`
            });
        }
    }
    if (utils.md5(req.body.password) !== user.password) {
        user.passwordRetry++;
        yield UsersRepository.persist(user);
        if (user.passwordRetry < 4) {
            return res.status(403).send({
                message: `密码错误`
            });
        }
        else {
            return res.status(403).send({
                message: `密码错误，还有 ${retryCount + 1 - user.passwordRetry} 次重试机会，失败后登录将冻结 ${waitTime} 秒`
            });
        }
    }
    else {
        user.passwordRetry = 0;
        yield UsersRepository.persist(user);
    }
    delete user.password;
    res.send(user);
})));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=index.js.map