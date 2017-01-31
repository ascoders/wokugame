"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const user_1 = require("../entitys/user");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const utils = require("../../../components/node-utils");
let Users = class Users {
    constructor() {
        this.findAndCountAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
            const result = yield this.userRepository
                .createQueryBuilder('user')
                .select(['user.id as user_id', 'user.nickname as user_nickname'])
                .setLimit(total)
                .setOffset(total * (page - 1))
                .getManyAndCount();
            res.send({
                rows: result[0],
                count: result[1]
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.password) {
                return res.status(400).send({
                    message: '必须设置密码'
                });
            }
            if (req.body.password.length < 5) {
                return res.status(400).send({
                    message: '密码长度不能小于 5'
                });
            }
            const user = new user_1.default();
            user.nickname = req.body.nickname;
            user.password = utils.md5(req.body.password);
            user.passwordRetry = 0;
            const result = yield this.userRepository.persist(user);
            req.session['userId'] = user.id;
            delete result.password;
            res.send(result);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository
                .createQueryBuilder('user')
                .where(`user.nickname=:nickname`)
                .setParameters({
                nickname: req.body.nickname
            })
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
                    yield this.userRepository.persist(user);
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
                yield this.userRepository.persist(user);
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
                yield this.userRepository.persist(user);
            }
            req.session['userId'] = user.id;
            delete user.password;
            res.send(user);
        });
        this.getAuthenticatedUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.session['userId']) {
                return res.status(404).send({
                    message: '用户不存在'
                });
            }
            const user = yield this.userRepository.findOneById(req.session['userId']);
            if (!user) {
                return res.status(404).send({
                    message: '用户不存在'
                });
            }
            res.send(user);
        });
        this.deleteAuthenticatedUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield req.session.destroy(null);
            res.send(true);
        });
    }
};
__decorate([
    typeorm_typedi_extensions_1.OrmRepository(user_1.default),
    __metadata("design:type", typeorm_1.Repository)
], Users.prototype, "userRepository", void 0);
Users = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], Users);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Users;
//# sourceMappingURL=users.js.map