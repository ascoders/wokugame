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
let GameSimulatedPlanetWarship = class GameSimulatedPlanetWarship {
    constructor() {
        this.count = 0;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        comment: '主键'
    }),
    __metadata("design:type", Number)
], GameSimulatedPlanetWarship.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int'
    }),
    __metadata("design:type", Number)
], GameSimulatedPlanetWarship.prototype, "planetId", void 0);
__decorate([
    typeorm_1.Column({
        comment: '用户起的名字',
        type: 'string',
        length: 15
    }),
    Validator.IsString({ message: '必须为字符串' }),
    Validator.Length(2, 15, { message: '长度为 2~15' }),
    __metadata("design:type", String)
], GameSimulatedPlanetWarship.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        comment: '战舰的 key',
        type: 'string',
        length: 5
    }),
    Validator.IsString({ message: '必须为字符串' }),
    Validator.Length(1, 15, { message: '长度为 1~15' }),
    __metadata("design:type", String)
], GameSimulatedPlanetWarship.prototype, "key", void 0);
__decorate([
    typeorm_1.Column({
        comment: '装备列表',
        type: 'json'
    }),
    __metadata("design:type", Object)
], GameSimulatedPlanetWarship.prototype, "equipments", void 0);
__decorate([
    typeorm_1.Column({
        comment: '拥有数量',
        type: 'int',
        length: 11
    }),
    __metadata("design:type", Number)
], GameSimulatedPlanetWarship.prototype, "count", void 0);
GameSimulatedPlanetWarship = __decorate([
    typeorm_1.Entity()
], GameSimulatedPlanetWarship);
exports.default = GameSimulatedPlanetWarship;
//# sourceMappingURL=game-simulated-planet-warship.js.map