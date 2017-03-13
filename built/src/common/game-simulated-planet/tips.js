"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildings_1 = require("./buildings");
const names_1 = require("./names");
const tips = new Map();
tips.set(0, `你进入了一个宏伟的虚拟世界，并控制了一个星球。现在点击『采集』按钮来收集资源，收集至少 50 块晶体矿`);
tips.set(1, `建造两座 ${buildings_1.default.get(names_1.buildingNames.house).name} 发展你的星球`);
tips.set(2, `晶体矿是星球上重要的基础资源，所有建筑都需要晶体矿提供能源建造。现在可以建造两座 ${buildings_1.default.get(names_1.buildingNames.crystal).name} 生产晶体矿`);
tips.set(3, `瓦斯矿是极为稀有的资源，建造一座 ${buildings_1.default.get(names_1.buildingNames.gas).name} 生产瓦斯`);
tips.set(4, `建造一台 ${buildings_1.default.get(names_1.buildingNames.diggerCrystal).name}`);
tips.set(5, `设计一架战舰`);
tips.set(6, `建造一个造舰场`);
exports.default = tips;
//# sourceMappingURL=tips.js.map