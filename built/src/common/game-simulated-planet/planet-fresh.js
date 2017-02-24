"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_simulated_planet_1 = require("../../common/game-simulated-planet");
const math_1 = require("../../../components/math");
exports.default = (planet, startTime, serverTimeDiff) => {
    const buildingHelper = new game_simulated_planet_1.BuildingHelper(serverTimeDiff);
    const endTime = new Date().getTime() + serverTimeDiff;
    if (endTime < startTime) {
        throw new Error('时间错误');
    }
    const harvestTime = Math.abs(endTime - startTime);
    let populationLimit = 0;
    let populationIncrement = 0;
    let builtSize = 0;
    let crystalIncrement = 0;
    let gasIncrement = 0;
    planet.buildings.forEach(building => {
        const buildingInfo = buildingHelper.getInfo(building);
        const finishedTime = buildingHelper.getFinishedTime(building);
        builtSize += buildingInfo.size;
        if (finishedTime > 0 || building.level > 1) {
            const buildingHarvestTime = finishedTime > 0 ? Math.min(harvestTime, finishedTime) : harvestTime;
            buildingInfo.effects.forEach((effect, index) => {
                const effectValue = buildingHelper.getEffectValue(building, index);
                switch (effect) {
                    case 'population':
                        populationIncrement += math_1.division(effectValue[0] * buildingHarvestTime, 1000 * 60 * 60);
                        break;
                    case 'populationLimit':
                        populationLimit += effectValue[0];
                        break;
                    case 'crystal':
                        crystalIncrement += math_1.division(effectValue[0] * buildingHarvestTime, 1000 * 60 * 60);
                        break;
                    case 'gas':
                        gasIncrement += math_1.division(effectValue[0] * buildingHarvestTime, 1000 * 60 * 60);
                        break;
                }
            });
        }
    });
    if (planet.population + populationIncrement > populationLimit) {
        populationIncrement = 0;
    }
    planet.population += populationIncrement;
    planet.crystal += crystalIncrement;
    planet.gas += gasIncrement;
    return {
        builtSize,
        populationLimit
    };
};
//# sourceMappingURL=planet-fresh.js.map