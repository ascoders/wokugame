"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameSimulatedPlanetStore {
    constructor() {
        this.currentPlanetIndex = 0;
        this.currentPlanetPopulationLimit = 0;
        this.currentPlanetBuiltSize = 0;
        this.serverTimeDiff = 0;
        this.lastHarvest = 0;
    }
    get currentPlanet() {
        return this.gameUser.planets[this.currentPlanetIndex];
    }
}
exports.default = GameSimulatedPlanetStore;
//# sourceMappingURL=store.js.map