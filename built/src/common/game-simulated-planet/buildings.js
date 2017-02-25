"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildings = new Map();
buildings.set('house', {
    name: '生态球',
    description: '星球居民的栖身之所。提升人口上限，缓慢产生人口',
    size: 1,
    progressNeed: 1,
    limit: 5,
    effects: ['populationLimit', 'population'],
    data: [
        [[30, 0], [3 * 1000], [280], [190]],
        [[35, 0], [5 * 1000], [360], [218]],
        [[47, 0], [10 * 1000], [430], [276]],
        [[50, 0], [15 * 1000], [520], [320]],
        [[62, 0], [20 * 1000], [624], [352]],
        [[70, 0], [30 * 1000], [750], [386]],
        [[98, 0], [60 * 1000], [900], [425]],
        [[102, 0], [60 * 1000 * 2], [1100], [510]],
        [[120, 0], [60 * 1000 * 3], [1450], [590]],
        [[145, 0], [60 * 1000 * 4], [1900], [680]]
    ]
});
buildings.set('crystal', {
    name: '晶矿采掘厂',
    description: '开采并加工晶体矿，为星球源源不断提供晶体矿',
    size: 1,
    progressNeed: 2,
    limit: 5,
    effects: ['crystal'],
    data: [
        [[30, 0], [3 * 1000], [280], [220]],
        [[35, 0], [5 * 1000], [360], [242]],
        [[47, 0], [10 * 1000], [430], [270]],
        [[50, 0], [15 * 1000], [520], [297]],
        [[62, 0], [20 * 1000], [624], [326]],
        [[70, 0], [30 * 1000], [750], [360]],
        [[98, 0], [60 * 1000], [900], [396]],
        [[102, 0], [60 * 1000 * 2], [1100], [470]],
        [[120, 0], [60 * 1000 * 3], [1450], [564]],
        [[145, 0], [60 * 1000 * 4], [1900], [680]]
    ]
});
buildings.set('gas', {
    name: '瓦斯精炼厂',
    description: '开采并提炼珍贵的瓦斯，这种高级资源主要用来提升建筑与舰队强度',
    size: 1,
    progressNeed: 3,
    limit: 3,
    effects: ['gas'],
    data: [
        [[60, 0], [5 * 1000], [36]],
        [[67, 0], [10 * 1000], [39]],
        [[75, 0], [15 * 1000], [43]],
        [[89, 0], [20 * 1000], [50]],
        [[98, 0], [30 * 1000], [58]]
    ]
});
buildings.set('diggerCrystal', {
    name: '晶体矿采集机',
    description: '增加每次采集的晶体矿收益',
    size: 2,
    progressNeed: 4,
    limit: 2,
    effects: ['diggerCrystal'],
    data: [
        [[150, 0], [30 * 1000], [1]],
        [[200, 0], [45 * 1000], [3]]
    ]
});
buildings.set('diggerGas', {
    name: '瓦斯采集机',
    description: '增加每次采集的瓦斯收益',
    size: 2,
    progressNeed: 4,
    limit: 2,
    effects: ['diggerGas'],
    data: [
        [[0, 15], [30 * 1000], [1]],
        [[0, 60], [60 * 1000], [2]]
    ]
});
buildings.set('autoDigger', {
    name: '自动采集机',
    description: '采集按钮将自动点击（离线也生效）',
    size: 3,
    progressNeed: 5,
    limit: 1,
    effects: ['autoDigger'],
    data: [
        [[12000, 1000], [60 * 1000 * 60 * 6]]
    ]
});
exports.default = buildings;
exports.buildingList = ['house', 'crystal', 'gas', 'diggerCrystal', 'diggerGas', 'autoDigger'];
//# sourceMappingURL=buildings.js.map