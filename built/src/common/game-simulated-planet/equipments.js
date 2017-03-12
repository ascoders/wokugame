"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const names_1 = require("./names");
exports.arms = [{
        name: '弹道',
        description: '对横排敌人溅射',
        children: [{
                key: names_1.equipmentKeys.ballistic1,
                name: '加特林机枪I型',
                size: 1,
                crystal: 5,
                gas: 0,
                time: 1 * 1000,
                effects: [names_1.equipmentEffects.horizontalSputtering],
                data: [[9, 50]]
            }, {
                key: names_1.equipmentKeys.ballistic2,
                name: '加特林机枪Ⅱ型',
                size: 1,
                crystal: 19,
                gas: 0,
                time: 3 * 1000,
                effects: [names_1.equipmentEffects.horizontalSputtering],
                data: [[11, 50]]
            }]
    }, {
        name: '定向',
        description: '对纵排敌人溅射',
        children: [{
                key: names_1.equipmentKeys.directional1,
                name: '粒子炮I型',
                size: 2,
                crystal: 6,
                gas: 0,
                time: 1 * 1000,
                effects: [names_1.equipmentEffects.verticalSputtering],
                data: [[18, 45]]
            }, {
                key: names_1.equipmentKeys.directional2,
                name: '粒子炮Ⅱ型',
                size: 2,
                crystal: 20,
                gas: 0,
                time: 3 * 1000,
                effects: [names_1.equipmentEffects.verticalSputtering],
                data: [[20, 45]]
            }]
    }, {
        name: '导弹',
        description: '对所有敌人溅射',
        children: [{
                key: names_1.equipmentKeys.missile1,
                name: '巡航导弹I型',
                size: 3,
                crystal: 7,
                gas: 0,
                time: 1 * 1000,
                effects: [names_1.equipmentEffects.allSputtering],
                data: [[9, 33]]
            }, {
                key: names_1.equipmentKeys.missile2,
                name: '巡航导弹Ⅱ型',
                size: 3,
                crystal: 22,
                gas: 0,
                time: 3 * 1000,
                effects: [names_1.equipmentEffects.allSputtering],
                data: [[12, 33]]
            }]
    }];
exports.equipments = [{
        name: '辅助',
        description: '增强战舰的续航能力',
        children: [{
                key: names_1.equipmentKeys.fuel1,
                name: '燃料仓Ⅰ型',
                size: 1,
                crystal: 3,
                gas: 0,
                time: 1 * 1000,
                effects: [names_1.equipmentEffects.fuel],
                data: [[500]]
            }, {
                key: names_1.equipmentKeys.fuel2,
                name: '燃料仓Ⅱ型',
                size: 1,
                crystal: 8,
                gas: 0,
                time: 1 * 2000,
                effects: [names_1.equipmentEffects.fuel],
                data: [[1000]]
            }]
    }];
exports.allEquipments = new Map();
exports.arms.forEach(armCategory => armCategory.children.forEach(arm => exports.allEquipments.set(arm.key, arm)));
exports.equipments.forEach(equipmentCategory => equipmentCategory.children.forEach(equipment => exports.allEquipments.set(equipment.key, equipment)));
function putOnEquipment(warship, equipmentName) {
    const equipmenet = exports.allEquipments.get(equipmentName);
    if (!equipmenet) {
        return;
    }
    if (!warship.power) {
        warship.power = 0;
    }
    equipmenet.effects.forEach((effectKey, index) => {
        warship.crystal += equipmenet.crystal;
        warship.gas += equipmenet.gas;
        warship.time += equipmenet.time;
        const effectValue = equipmenet.data[index];
        switch (effectKey) {
            case names_1.equipmentEffects.horizontalSputtering:
                warship.power += effectValue[0];
                break;
            case names_1.equipmentEffects.verticalSputtering:
                warship.power += effectValue[0];
                break;
            case names_1.equipmentEffects.allSputtering:
                warship.power += effectValue[0];
                break;
            case names_1.equipmentEffects.fuel:
                warship.fuel += effectValue[0];
                break;
        }
    });
}
exports.putOnEquipment = putOnEquipment;
//# sourceMappingURL=equipments.js.map