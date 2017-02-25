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
let GameSimulatedPlanetBuilding = class GameSimulatedPlanetBuilding {
    constructor() {
        this.level = 1;
        this.buildStart = new Date();
        this.created = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        comment: '主键'
    }),
    __metadata("design:type", Number)
], GameSimulatedPlanetBuilding.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => game_simulated_planet_planet_1.default, gamePlanet => gamePlanet.buildings),
    typeorm_1.JoinColumn(),
    __metadata("design:type", game_simulated_planet_planet_1.default)
], GameSimulatedPlanetBuilding.prototype, "planet", void 0);
__decorate([
    typeorm_1.Column({
        comment: '建筑类型',
        type: 'string',
        length: 15
    }),
    Validator.IsString(),
    Validator.Length(1, 15, { message: '最小为 0' }),
    __metadata("design:type", String)
], GameSimulatedPlanetBuilding.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({
        comment: '建筑等级',
        type: 'int',
        length: 2
    }),
    Validator.IsNumber(),
    Validator.Min(0, { message: '最小为 0' }),
    Validator.Max(99, { message: '最大为 99' }),
    __metadata("design:type", Number)
], GameSimulatedPlanetBuilding.prototype, "level", void 0);
__decorate([
    typeorm_1.Column({
        comment: '这个等级 建造/升级 开始的时间'
    }),
    __metadata("design:type", Date)
], GameSimulatedPlanetBuilding.prototype, "buildStart", void 0);
__decorate([
    typeorm_1.Column({
        comment: '建筑初始建造时间'
    }),
    __metadata("design:type", Date)
], GameSimulatedPlanetBuilding.prototype, "created", void 0);
GameSimulatedPlanetBuilding = __decorate([
    typeorm_1.Entity()
], GameSimulatedPlanetBuilding);
exports.default = GameSimulatedPlanetBuilding;
//# sourceMappingURL=game-simulated-planet-building.js.map