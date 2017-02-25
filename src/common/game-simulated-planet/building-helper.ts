import { default as buildings, BuildingInfo } from './buildings'

export default class BuildingHelper {
    // 与服务器的时差
    private serverTimeDiff: number

    constructor(serverTimeDiff: number) {
        this.serverTimeDiff = serverTimeDiff
    }

    /**
     * 获取建筑基础信息，根据字符串的建筑名
     */
    getInfoByName = (name: string) => {
        const buildingInfo = buildings.get(name)
        if (!buildingInfo) {
            throw Error('不存在的建筑')
        }
        return buildingInfo
    }

    /**
     * 获取建筑的基础信息
     */
    getInfo = (building: Entitys.GameSimulatedPlanetBuilding) => {
        const buildingInfo = buildings.get(building.type)
        if (!buildingInfo) {
            throw Error('不存在的建筑')
        }
        return buildingInfo
    }

    /**
     * 获取建筑建造完成后距今的时间
     */
    getFinishedTime = (building: Entitys.GameSimulatedPlanetBuilding) => {
        const currentTime = new Date().getTime() + this.serverTimeDiff
        const buildTime = this.getBuildTime(building)
        return currentTime - new Date(building.buildStart).getTime() - buildTime
    }

    /**
     * 获取建筑当前等级
     */
    getLevel = (building: Entitys.GameSimulatedPlanetBuilding) => {
        const finishedTime = this.getFinishedTime(building)
        if (finishedTime > 0) {
            // 建造完成，直接返回当前等级
            return building.level
        } else {
            // 没有升级完成
            if (building.level > 1) {
                return building.level - 1
            } else {
                // 没有建造完成
                return 0
            }
        }
    }

    /**
     * 是否有这个级别
     */
    hasLevelByInfo = (buildingInfo: BuildingInfo, level: number) => {
        return buildingInfo.data.length >= level
    }

    /**
     * 获取建筑消耗金币
     */
    getCostByInfo = (buildingInfo: BuildingInfo, level: number) => {
        if (!this.hasLevelByInfo(buildingInfo, level)) {
            throw Error('级别不存在')
        }
        return {
            crystal: buildingInfo.data[level - 1][0][0],
            gas: buildingInfo.data[level - 1][0][1]
        }
    }

    /**
     * 获取建筑建造花费
     */
    getCost = (building: Entitys.GameSimulatedPlanetBuilding) => {
        const buildingInfo = this.getInfo(building)
        let buildingLevel = this.getLevel(building)

        // 建筑还未建造完毕
        if (buildingLevel === 0) {
            throw Error('还未建造完毕')
        }
        return this.getCostByInfo(buildingInfo, buildingLevel)
    }

    /**
     * 获取建筑建造耗时
     */
    getBuildTimeByInfo = (buildingInfo: BuildingInfo, level: number) => {
        if (!this.hasLevelByInfo(buildingInfo, level)) {
            throw Error('级别不存在')
        }
        return buildingInfo.data[level - 1][1][0]
    }

    getBuildTime = (building: Entitys.GameSimulatedPlanetBuilding) => {
        const buildingInfo = this.getInfo(building)

        // 建造时间，按照建筑当前等级计算
        // 每个建造时间都与建筑当前时间相对应
        const buildingLevel = building.level

        // 建筑还未建造完毕
        if (buildingLevel === 0) {
            throw Error('还未建造完毕')
        }
        return this.getBuildTimeByInfo(buildingInfo, buildingLevel)
    }

    /**
     * 获取第 index 个技能的能力值, 下标从 0 开始
     */
    getEffectValue = (building: Entitys.GameSimulatedPlanetBuilding, index: number) => {
        const buildingInfo = this.getInfo(building)
        return buildingInfo.data[this.getLevel(building) - 1][index + 2]
    }
}