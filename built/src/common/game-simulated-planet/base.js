"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const building_helper_1 = require("./building-helper");
exports.collectionInterval = 1000 * 5;
exports.collectionGain = {
    crystal: 15,
    gas: 0
};
exports.collectionGainWithBuildingSupport = (planet, serverTimeDiff) => {
    const buildingHelper = new building_helper_1.default(serverTimeDiff);
    let crystal = 0;
    let gas = 0;
    crystal += exports.collectionGain.crystal;
    gas += exports.collectionGain.gas;
    planet.buildings.filter(building => building.type === 'diggerCrystal' && buildingHelper.getFinishedTime(building) > 0)
        .forEach(building => {
        crystal += buildingHelper.getEffectValue(building, 0)[0];
    });
    planet.buildings.filter(building => building.type === 'diggerGas' && buildingHelper.getFinishedTime(building) > 0)
        .forEach(building => {
        gas += buildingHelper.getEffectValue(building, 0)[0];
    });
    return { crystal, gas };
};
//# sourceMappingURL=base.js.map