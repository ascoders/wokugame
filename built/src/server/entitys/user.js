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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Validator = require("class-validator");
const game_simulated_planet_user_1 = require("./game-simulated-planet-user");
let User = class User {
    constructor() {
        this.passwordRetry = 0;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        comment: '主键'
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        comment: '用户昵称',
        length: 10,
        unique: true
    }),
    Validator.IsString({ message: '必须为字符串' }),
    Validator.Length(2, 10, { message: '长度在 2~10' }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column({
        comment: '密码',
        length: 32,
        nullable: true
    }),
    Validator.ValidateIf(user => user.password !== null && user.password !== undefined),
    Validator.IsString({ message: '必须为字符串' }),
    Validator.Length(32, 32, { message: '加密后长度必须为 32' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        comment: '密码最大尝试次数',
        type: 'int',
        length: 1
    }),
    Validator.IsInt({ message: '必须为整型' }),
    Validator.Min(0, { message: '最小为 0' }),
    Validator.Max(9, { message: '最大为 9' }),
    __metadata("design:type", Number)
], User.prototype, "passwordRetry", void 0);
__decorate([
    typeorm_1.Column({
        comment: '邮箱',
        length: 30,
        nullable: true
    }),
    Validator.ValidateIf(user => user.email !== null && user.email !== undefined),
    Validator.IsEmail(null, { message: '格式必须为 email' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        comment: '注册日期'
    }),
    Validator.ValidateIf(user => user.created !== undefined),
    Validator.IsDate({ message: '格式必须为日期' }),
    __metadata("design:type", Date)
], User.prototype, "created", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        comment: '更新日期'
    }),
    Validator.ValidateIf(user => user.updated !== undefined),
    Validator.IsDate({ message: '格式必须为日期' }),
    __metadata("design:type", Date)
], User.prototype, "updated", void 0);
__decorate([
    typeorm_1.OneToOne(type => game_simulated_planet_user_1.default, gameSimulatedPlanetUser => gameSimulatedPlanetUser.user, {
        cascadeAll: true
    }),
    __metadata("design:type", game_simulated_planet_user_1.default)
], User.prototype, "gameSimulatedPlanetUser", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.default = User;
//# sourceMappingURL=user.js.map