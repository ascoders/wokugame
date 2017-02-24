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
const game_simulated_planet_building_1 = require("./game-simulated-planet-building");
let GameSimulatedPlanetPlanet = class GameSimulatedPlanetPlanet {
    constructor() {
        this.population = 0;
        this.crystal = 0;
        this.gas = 0;
        this.progress = 0;
        this.size = 45;
        this.buildings = [];
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        comment: '主键'
    }),
    __metadata("design:type", Number)
], GameSimulatedPlanetPlanet.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => game_simulated_planet_user_1.default, gameUser => gameUser.planets),
    typeorm_1.JoinColumn(),
    __metadata("design:type", game_simulated_planet_user_1.default)
], GameSimulatedPlanetPlanet.prototype, "gameUser", void 0);
__decorate([
    typeorm_1.Column({
        comment: '总人口数',
        type: 'decimal',
        precision: 9 + 7,
        scale: 7
    }),
    Validator.IsNumber({ message: '必须为数字' }),
    Validator.Min(0, { message: '最小为 0' }),
    Validator.Max(200000000, { message: '最大为 200000000' }),
    __metadata("design:type", Number)
], GameSimulatedPlanetPlanet.prototype, "population", void 0);
__decorate([
    typeorm_1.Column({
        comment: '晶体矿',
        type: 'decimal',
        precision: 9 + 7,
        scale: 7
    }),
    Validator.IsNumber({ message: '必须为数字' }),
    Validator.Min(0, { message: '最小为 0' }),
    Validator.Max(999999999, { message: '最大为 999999999' }),
    __metadata("design:type", Number)
], GameSimulatedPlanetPlanet.prototype, "crystal", void 0);
__decorate([
    typeorm_1.Column({
        comment: '瓦斯',
        type: 'decimal',
        precision: 9 + 7,
        scale: 7
    }),
    Validator.IsNumber({ message: '必须为数字' }),
    Validator.Min(0, { message: '最小为 0' }),
    Validator.Max(999999999, { message: '最大为 999999999' }),
    __metadata("design:type", Number)
], GameSimulatedPlanetPlanet.prototype, "gas", void 0);
__decorate([
    typeorm_1.Column({
        comment: '星球发展阶段',
        type: 'int',
        length: 2
    }),
    Validator.Min(0, { message: '最小为 0' }),
    Validator.Max(99, { message: '最大为 99' }),
    __metadata("design:type", Number)
], GameSimulatedPlanetPlanet.prototype, "progress", void 0);
__decorate([
    typeorm_1.Column({
        comment: '建造空间',
        type: 'int',
        length: 2
    }),
    Validator.Min(0, { message: '最小为 0' }),
    Validator.Max(99, { message: '最大为 99' }),
    __metadata("design:type", Number)
], GameSimulatedPlanetPlanet.prototype, "size", void 0);
__decorate([
    typeorm_1.OneToMany(type => game_simulated_planet_building_1.default, gameBuilding => gameBuilding.planet, {
        cascadeInsert: true,
        cascadeUpdate: true
    }),
    __metadata("design:type", Array)
], GameSimulatedPlanetPlanet.prototype, "buildings", void 0);
GameSimulatedPlanetPlanet = __decorate([
    typeorm_1.Entity()
], GameSimulatedPlanetPlanet);
exports.default = GameSimulatedPlanetPlanet;
//# sourceMappingURL=game-simulated-planet-planet.js.map