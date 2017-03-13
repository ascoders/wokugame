"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildingNames = {
    house: 'house',
    crystal: 'crystal',
    gas: 'gas',
    diggerCrystal: 'diggerC',
    diggerGas: 'diggerG',
    productionWarship: 'productWar',
    autoDigger: 'autoDigger'
};
var buildingEffects;
(function (buildingEffects) {
    buildingEffects[buildingEffects["populationLimit"] = 0] = "populationLimit";
    buildingEffects[buildingEffects["population"] = 1] = "population";
    buildingEffects[buildingEffects["crystal"] = 2] = "crystal";
    buildingEffects[buildingEffects["gas"] = 3] = "gas";
    buildingEffects[buildingEffects["diggerCrystal"] = 4] = "diggerCrystal";
    buildingEffects[buildingEffects["diggerGas"] = 5] = "diggerGas";
    buildingEffects[buildingEffects["autoDigger"] = 6] = "autoDigger";
    buildingEffects[buildingEffects["productWarship"] = 7] = "productWarship";
})(buildingEffects = exports.buildingEffects || (exports.buildingEffects = {}));
var equipmentEffects;
(function (equipmentEffects) {
    equipmentEffects[equipmentEffects["horizontalSputtering"] = 0] = "horizontalSputtering";
    equipmentEffects[equipmentEffects["verticalSputtering"] = 1] = "verticalSputtering";
    equipmentEffects[equipmentEffects["allSputtering"] = 2] = "allSputtering";
    equipmentEffects[equipmentEffects["fuel"] = 3] = "fuel";
})(equipmentEffects = exports.equipmentEffects || (exports.equipmentEffects = {}));
exports.equipmentKeys = {
    ballistic1: 'bl1',
    ballistic2: 'bl2',
    directional1: 'di1',
    directional2: 'di2',
    missile1: 'mi1',
    missile2: 'mi2',
    fuel1: 'fl1',
    fuel2: 'fl2'
};
exports.warshipKeys = {
    scout1: 'sc1',
    scout2: 'sc2',
    frigate1: 'fr1',
    frigate2: 'fr2',
    destroyer1: 'dt1',
    destroyer2: 'dt2',
    motherShip1: 'ms1',
    motherShip2: 'ms2',
    titan1: 'tt1',
    titan2: 'tt2'
};
//# sourceMappingURL=names.js.map