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
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const game_simulated_planet_user_1 = require("../entitys/game-simulated-planet-user");
const game_simulated_planet_planet_1 = require("../entitys/game-simulated-planet-planet");
const game_simulated_planet_building_1 = require("../entitys/game-simulated-planet-building");
const user_1 = require("../entitys/user");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const game_simulated_planet_1 = require("../../common/game-simulated-planet");
const buildingHelper = new game_simulated_planet_1.BuildingHelper(0);
let GameSimulatedPlanet = class GameSimulatedPlanet {
    constructor() {
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.session['userId']) {
                throw Error('用户不存在');
            }
            const user = yield this.userRepository.createQueryBuilder('user')
                .where('user.id=:id', { id: Number(req.session['userId']) })
                .leftJoinAndMapOne('user.gameSimulatedPlanetUser', game_simulated_planet_user_1.default, 'gameUser', 'gameUser.user=user.id')
                .leftJoinAndMapMany('gameUser.planets', game_simulated_planet_planet_1.default, 'gamePlanet', 'gameUser.id=gamePlanet.gameUser')
                .leftJoinAndMapMany('gamePlanet.buildings', game_simulated_planet_building_1.default, 'gameBuilding', 'gamePlanet.id=gameBuilding.planet')
                .getOne();
            if (!user) {
                throw Error('用户不存在');
            }
            return user;
        });
        this.harvestUser = (user, req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!user.gameSimulatedPlanetUser) {
                throw Error('游戏用户不存在');
            }
            const currentDate = new Date();
            user.gameSimulatedPlanetUser.planets.forEach(planet => {
                game_simulated_planet_1.planetFresh(planet, user.gameSimulatedPlanetUser.lastHarvest.getTime(), 0);
            });
            user.gameSimulatedPlanetUser.lastHarvest = currentDate;
            return user;
        });
        this.getAndHarvestUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(req, res);
            yield this.harvestUser(user, req, res);
            return user;
        });
        this.upgradeUserProgressAndSave = (user, req, res) => __awaiter(this, void 0, void 0, function* () {
            game_simulated_planet_1.upgradeUserProgress(user.gameSimulatedPlanetUser, buildingHelper);
            yield this.gameUserRepository.persist(user.gameSimulatedPlanetUser);
            return user;
        });
        this.getAuthenticatedUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(req, res);
            if (!user.gameSimulatedPlanetUser) {
                const gameUser = new game_simulated_planet_user_1.default();
                gameUser.user = user;
                const gamePlanet = new game_simulated_planet_planet_1.default();
                gameUser.planets.push(gamePlanet);
                yield this.gameUserRepository.persist(gameUser);
                res.send({
                    user: gameUser,
                    currentTime: new Date().getTime()
                });
            }
            else {
                yield this.harvestUser(user, req, res);
                yield this.upgradeUserProgressAndSave(user, req, res);
                res.send({
                    user: user.gameSimulatedPlanetUser,
                    currentTime: new Date().getTime()
                });
            }
        });
        this.collection = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getAndHarvestUser(req, res);
            const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === req.body.planetId);
            if (!planet) {
                throw Error('星球不存在');
            }
            if (planet.buildings.findIndex(building => building.type === 'digger') > -1) {
                throw Error('已经存在自动收集机器');
            }
            if (new Date().getTime() < user.gameSimulatedPlanetUser.lastCollection.getTime() + game_simulated_planet_1.collectionInterval) {
                throw Error('还未到采集周期');
            }
            planet.crystal += 10;
            user.gameSimulatedPlanetUser.lastCollection = new Date();
            yield this.upgradeUserProgressAndSave(user, req, res);
            res.send({
                crystal: 10
            });
        });
        this.building = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getAndHarvestUser(req, res);
            const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === req.body.planetId);
            if (!planet) {
                throw Error('星球不存在');
            }
            const buildingInfo = game_simulated_planet_1.buildings.get(req.body.type.toString());
            if (!buildingInfo) {
                throw Error('不存在的建筑');
            }
            const buildingCost = buildingInfo.data[0][0][0];
            if (planet.crystal < buildingCost) {
                throw Error('晶体矿不足');
            }
            let thisBuildingAlreadyExistCount = 0;
            planet.buildings.forEach(building => {
                if (building.type === req.body.type.toString()) {
                    thisBuildingAlreadyExistCount++;
                }
            });
            if (thisBuildingAlreadyExistCount >= buildingInfo.limit) {
                throw Error('不能再建造更多');
            }
            const building = new game_simulated_planet_building_1.default();
            building.type = req.body.type;
            planet.buildings.push(building);
            planet.crystal -= buildingCost;
            yield this.upgradeUserProgressAndSave(user, req, res);
            res.send(building);
        });
        this.destroyBuilding = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getAndHarvestUser(req, res);
            const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === Number(req.body.planetId));
            if (!planet) {
                throw Error('星球不存在');
            }
            const building = planet.buildings.find(building => building.id === Number(req.params.buildingId));
            if (!building) {
                throw Error('不存在的建筑');
            }
            const buildingIndex = planet.buildings.indexOf(building);
            planet.buildings.splice(buildingIndex, 1);
            yield this.gameBuildingRepository.remove(building);
            res.send(building);
        });
        this.upgradeBuilding = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getAndHarvestUser(req, res);
            const planet = user.gameSimulatedPlanetUser.planets.find(planet => planet.id === Number(req.body.planetId));
            if (!planet) {
                throw Error('星球不存在');
            }
            const building = planet.buildings.find(building => building.id === Number(req.params.buildingId));
            if (!building) {
                throw Error('不存在的建筑');
            }
            const buildingInfo = buildingHelper.getInfo(building);
            const finishedTime = buildingHelper.getFinishedTime(building);
            if (finishedTime <= 0) {
                throw Error('建筑还未完成建造/升级');
            }
            const nextLevelCost = buildingHelper.getCostByInfo(buildingInfo, building.level + 1);
            if (planet.crystal < nextLevelCost) {
                throw Error('晶体矿不足');
            }
            building.level += 1;
            building.buildStart = new Date();
            planet.crystal -= nextLevelCost;
            yield this.upgradeUserProgressAndSave(user, req, res);
            res.send(building);
        });
    }
};
__decorate([
    typeorm_typedi_extensions_1.OrmRepository(user_1.default),
    __metadata("design:type", typeorm_1.Repository)
], GameSimulatedPlanet.prototype, "userRepository", void 0);
__decorate([
    typeorm_typedi_extensions_1.OrmRepository(game_simulated_planet_user_1.default),
    __metadata("design:type", typeorm_1.Repository)
], GameSimulatedPlanet.prototype, "gameUserRepository", void 0);
__decorate([
    typeorm_typedi_extensions_1.OrmRepository(game_simulated_planet_planet_1.default),
    __metadata("design:type", typeorm_1.Repository)
], GameSimulatedPlanet.prototype, "gamePlanetRepository", void 0);
__decorate([
    typeorm_typedi_extensions_1.OrmRepository(game_simulated_planet_building_1.default),
    __metadata("design:type", typeorm_1.Repository)
], GameSimulatedPlanet.prototype, "gameBuildingRepository", void 0);
GameSimulatedPlanet = __decorate([
    typedi_1.Service()
], GameSimulatedPlanet);
exports.default = GameSimulatedPlanet;
//# sourceMappingURL=game-simulated-planet.js.map