"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const names_1 = require("./names");
const warshipList = [{
        name: '侦察机',
        description: '最轻量的宇宙飞船，特征 - 迅捷：30% 闪避概率',
        children: [{
                key: names_1.warshipKeys.scout1,
                name: '翼龙号侦察机I型',
                size: 5,
                fuel: 1000,
                shield: 300,
                hp: 300,
                crystal: 10,
                gas: 0,
                time: 1 * 1000
            }, {
                key: names_1.warshipKeys.scout2,
                name: '翼龙号侦察机Ⅱ型',
                size: 6,
                fuel: 2000,
                shield: 300,
                hp: 450,
                crystal: 20,
                gas: 0,
                time: 2 * 1000
            }]
    }, {
        name: '巡航舰',
        description: '高护盾，中耐久，特征 - 自动充能：每秒恢复 2% 护盾',
        children: [{
                key: names_1.warshipKeys.frigate1,
                name: '阿科纳级巡航舰I型',
                size: 8,
                fuel: 1500,
                shield: 750,
                hp: 500,
                crystal: 50,
                gas: 2,
                time: 2 * 1000
            }, {
                key: names_1.warshipKeys.frigate2,
                name: '阿科纳级巡航舰Ⅱ型',
                size: 10,
                fuel: 3000,
                shield: 900,
                hp: 600,
                crystal: 100,
                gas: 4,
                time: 4 * 1000
            }]
    }, {
        name: '驱逐舰',
        description: '中护盾，中耐久，特征 - 结构破坏：攻击有 35% 概率无视护盾',
        children: [{
                key: names_1.warshipKeys.destroyer1,
                name: '爱国者驱逐舰I型',
                size: 8,
                fuel: 2000,
                shield: 600,
                hp: 600,
                crystal: 55,
                gas: 2,
                time: 2 * 1000
            }, {
                key: names_1.warshipKeys.destroyer2,
                name: '爱国者驱逐舰Ⅱ型',
                size: 10,
                fuel: 4000,
                shield: 750,
                hp: 750,
                crystal: 95,
                gas: 4,
                time: 4 * 1000
            }]
    }, {
        name: '航母',
        description: '高护盾，高耐久，高容量，高造价，特征 - 纳米维修：每秒恢复 1% 护盾和耐久',
        children: [{
                key: names_1.warshipKeys.motherShip1,
                name: '尼米兹级航母I型',
                size: 10,
                fuel: 7000,
                shield: 900,
                hp: 900,
                crystal: 180,
                gas: 10,
                time: 8 * 1000
            }, {
                key: names_1.warshipKeys.motherShip2,
                name: '尼米兹级航母Ⅱ型',
                size: 13,
                fuel: 14000,
                shield: 1200,
                hp: 1200,
                crystal: 400,
                gas: 25,
                time: 16 * 1000
            }]
    }, {
        name: '泰坦',
        description: '超高护盾，超高耐久，超大容量，昂贵的造价，特征 - 纳米重组：每秒恢复 2% 护盾和耐久',
        children: [{
                key: names_1.warshipKeys.titan1,
                name: '巨人泰坦I型',
                size: 20,
                fuel: 20000,
                shield: 1800,
                hp: 1500,
                crystal: 2000,
                gas: 100,
                time: 60 * 1000
            }, {
                key: names_1.warshipKeys.titan2,
                name: '巨人泰坦Ⅱ型',
                size: 25,
                fuel: 40000,
                shield: 2600,
                hp: 2200,
                crystal: 6000,
                gas: 300,
                time: 120 * 1000
            }]
    }];
exports.warshipList = warshipList;
const warships = new Map();
exports.warships = warships;
warshipList.forEach(warshipCategory => warshipCategory.children.forEach(warship => warships.set(warship.key, warship)));
//# sourceMappingURL=warships.js.map