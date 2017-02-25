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
const game_simulated_planet_planet_1 = require("./game-simulated-planet-planet");
const user_1 = require("./user");
let GameSimulatedPlanetUser = class GameSimulatedPlanetUser {
    constructor() {
        this.progress = 0;
        this.hasReadProgress = false;
        this.planets = [];
        this.lastHarvest = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        comment: '主键'
    }),
    __metadata("design:type", Number)
], GameSimulatedPlanetUser.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_1.default, user => user.gameSimulatedPlanetUser),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_1.default)
], GameSimulatedPlanetUser.prototype, "user", void 0);
__decorate([
    typeorm_1.Column({
        comment: '游戏进度',
        type: 'int',
        length: 3
    }),
    Validator.Min(0, { message: '最小为 0' }),
    Validator.Max(999, { message: '最大为 999' }),
    __metadata("design:type", Number)
], GameSimulatedPlanetUser.prototype, "progress", void 0);
__decorate([
    typeorm_1.Column({
        comment: '当前进度提示是否已读'
    }),
    Validator.IsBoolean(),
    __metadata("design:type", Boolean)
], GameSimulatedPlanetUser.prototype, "hasReadProgress", void 0);
__decorate([
    typeorm_1.OneToMany(type => game_simulated_planet_planet_1.default, planet => planet.gameUser, {
        cascadeInsert: true,
        cascadeUpdate: true
    }),
    __metadata("design:type", Array)
], GameSimulatedPlanetUser.prototype, "planets", void 0);
__decorate([
    typeorm_1.Column({
        comment: '上次计算收益时间'
    }),
    __metadata("design:type", Date)
], GameSimulatedPlanetUser.prototype, "lastHarvest", void 0);
GameSimulatedPlanetUser = __decorate([
    typeorm_1.Entity()
], GameSimulatedPlanetUser);
exports.default = GameSimulatedPlanetUser;
//# sourceMappingURL=game-simulated-planet-user.js.map