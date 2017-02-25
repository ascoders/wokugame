"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildings_1 = require("./buildings");
class BuildingHelper {
    constructor(serverTimeDiff) {
        this.getInfoByName = (name) => {
            const buildingInfo = buildings_1.default.get(name);
            if (!buildingInfo) {
                throw Error('不存在的建筑');
            }
            return buildingInfo;
        };
        this.getInfo = (building) => {
            const buildingInfo = buildings_1.default.get(building.type);
            if (!buildingInfo) {
                throw Error('不存在的建筑');
            }
            return buildingInfo;
        };
        this.getFinishedTime = (building) => {
            const currentTime = new Date().getTime() + this.serverTimeDiff;
            const buildTime = this.getBuildTime(building);
            return currentTime - new Date(building.buildStart).getTime() - buildTime;
        };
        this.getLevel = (building) => {
            const finishedTime = this.getFinishedTime(building);
            if (finishedTime > 0) {
                return building.level;
            }
            else {
                if (building.level > 1) {
                    return building.level - 1;
                }
                else {
                    return 0;
                }
            }
        };
        this.hasLevelByInfo = (buildingInfo, level) => {
            return buildingInfo.data.length >= level;
        };
        this.getCostByInfo = (buildingInfo, level) => {
            if (!this.hasLevelByInfo(buildingInfo, level)) {
                throw Error('级别不存在');
            }
            return {
                crystal: buildingInfo.data[level - 1][0][0],
                gas: buildingInfo.data[level - 1][0][1]
            };
        };
        this.getCost = (building) => {
            const buildingInfo = this.getInfo(building);
            let buildingLevel = this.getLevel(building);
            if (buildingLevel === 0) {
                throw Error('还未建造完毕');
            }
            return this.getCostByInfo(buildingInfo, buildingLevel);
        };
        this.getBuildTimeByInfo = (buildingInfo, level) => {
            if (!this.hasLevelByInfo(buildingInfo, level)) {
                throw Error('级别不存在');
            }
            return buildingInfo.data[level - 1][1][0];
        };
        this.getBuildTime = (building) => {
            const buildingInfo = this.getInfo(building);
            const buildingLevel = building.level;
            if (buildingLevel === 0) {
                throw Error('还未建造完毕');
            }
            return this.getBuildTimeByInfo(buildingInfo, buildingLevel);
        };
        this.getEffectValue = (building, index) => {
            const buildingInfo = this.getInfo(building);
            return buildingInfo.data[this.getLevel(building) - 1][index + 2];
        };
        this.serverTimeDiff = serverTimeDiff;
    }
}
exports.default = BuildingHelper;
//# sourceMappingURL=building-helper.js.map