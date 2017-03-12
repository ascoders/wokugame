"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const names_1 = require("./names");
const buildingEffectDescription = new Map([
    [names_1.buildingEffects.populationLimit, '人口上限提高 %d'],
    [names_1.buildingEffects.population, '每小时提供 %d 人口'],
    [names_1.buildingEffects.crystal, '每小时提供 %d 晶体矿'],
    [names_1.buildingEffects.gas, '每小时提供 %d 瓦斯'],
    [names_1.buildingEffects.diggerCrystal, '每次采集晶体矿增加 %d'],
    [names_1.buildingEffects.diggerGas, '每次采集瓦斯增加 %d'],
    [names_1.buildingEffects.autoDigger, '自动采集']
]);
exports.buildingEffectDescription = buildingEffectDescription;
const equipmentEffectDescription = new Map([
    [names_1.equipmentEffects.horizontalSputtering, '攻击力 %d, 横排 %d% 溅射'],
    [names_1.equipmentEffects.verticalSputtering, '攻击力 %d, 纵排 %d% 溅射'],
    [names_1.equipmentEffects.allSputtering, '攻击力 %d, 全体 %d% 溅射'],
    [names_1.equipmentEffects.fuel, '增加 %d 燃料仓空间']
]);
exports.equipmentEffectDescription = equipmentEffectDescription;
//# sourceMappingURL=effect-description.js.map