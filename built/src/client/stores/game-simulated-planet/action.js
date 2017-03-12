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
const store_1 = require("./store");
const dependency_inject_1 = require("../../../../components/dependency-inject");
const services_1 = require("../../services");
const game_simulated_planet_1 = require("../../../common/game-simulated-planet");
const dynamic_object_1 = require("../../../../components/dynamic-object");
class GameSimulatedPlanetAction {
    loginAuthenticatedUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield services_1.GameSimulatedPlanetService.getAuthenticatedUser();
            const currentTime = new Date().getTime();
            this.store.gameUser = result.user;
            this.store.serverTimeDiff = result.currentTime - currentTime;
            this.store.lastHarvest = currentTime;
            this.store.buildingHelper = new game_simulated_planet_1.BuildingHelper(this.store.serverTimeDiff);
        });
    }
    collection(planetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { crystal, gas } = yield services_1.GameSimulatedPlanetService.collection(planetId);
            this.store.gameUser.planets.find(planet => planet.id === planetId).crystal += crystal;
            this.store.gameUser.planets.find(planet => planet.id === planetId).gas += gas;
            this.store.currentPlanet.lastCollection = new Date();
        });
    }
    building(planetId, buildingName) {
        return __awaiter(this, void 0, void 0, function* () {
            const building = yield services_1.GameSimulatedPlanetService.building(planetId, buildingName);
            this.store.gameUser.planets.find(planet => planet.id === planetId).buildings.push(building);
            const buildingInfo = this.store.buildingHelper.getInfoByName(buildingName);
            const cost = this.store.buildingHelper.getCostByInfo(buildingInfo, 1);
            this.store.currentPlanet.crystal -= cost.crystal;
            this.store.currentPlanet.gas -= cost.gas;
        });
    }
    destroyBuilding(planetId, buildingId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield services_1.GameSimulatedPlanetService.destroyBuilding(planetId, buildingId);
            let buildings = this.store.gameUser.planets.find(planet => planet.id === planetId).buildings;
            const deleteIndex = buildings.findIndex(building => building.id === buildingId);
            buildings.splice(deleteIndex, 1);
        });
    }
    upgradeBuilding(planetId, buildingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const building = yield services_1.GameSimulatedPlanetService.upgradeBuilding(planetId, buildingId);
            let targetBuilding = this.store.gameUser.planets.find(planet => planet.id === planetId).buildings
                .find(building => building.id === buildingId);
            dynamic_object_1.extendObservable(targetBuilding, building);
            const buildingInfo = this.store.buildingHelper.getInfo(targetBuilding);
            const cost = this.store.buildingHelper.getCostByInfo(buildingInfo, targetBuilding.level);
            this.store.currentPlanet.crystal -= cost.crystal;
            this.store.currentPlanet.gas -= cost.gas;
        });
    }
    designWarship(planetId, warship) {
        return __awaiter(this, void 0, void 0, function* () {
            yield services_1.GameSimulatedPlanetService.designWarship(planetId, warship);
        });
    }
    getDesignWarship(planetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const designedWarships = yield services_1.GameSimulatedPlanetService.getDesignWarship(planetId);
            this.store.designedWarships.set(this.store.currentPlanet.id, designedWarships);
        });
    }
    freshCurrentPlanet() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTime = new Date().getTime();
            const result = game_simulated_planet_1.planetFresh(this.store.gameUser.planets[this.store.currentPlanetIndex], this.store.lastHarvest + this.store.serverTimeDiff, this.store.serverTimeDiff);
            this.store.lastHarvest = currentTime;
            this.store.currentPlanetBuiltSize = result.builtSize;
            this.store.currentPlanetPopulationLimit = result.populationLimit;
            game_simulated_planet_1.upgradeUserProgress(this.store.gameUser, this.store.buildingHelper);
        });
    }
    deleteWarship(planetId, warshipId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield services_1.GameSimulatedPlanetService.deleteWarship(warshipId);
            let designedWarships = this.store.designedWarships.get(planetId);
            const deleteIndex = designedWarships.findIndex(designedWarship => designedWarship.id === warshipId);
            designedWarships.splice(deleteIndex, 1);
            designedWarships = designedWarships.slice();
            this.store.designedWarships.set(planetId, designedWarships);
        });
    }
}
__decorate([
    dependency_inject_1.inject(store_1.default),
    __metadata("design:type", store_1.default)
], GameSimulatedPlanetAction.prototype, "store", void 0);
exports.default = GameSimulatedPlanetAction;
//# sourceMappingURL=action.js.map