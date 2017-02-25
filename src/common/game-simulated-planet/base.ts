import BuildingHelper from './building-helper'

/**
 * 采集间隔
 */
export const collectionInterval = 1000 * 5

/**
 * 基础采集收益
 */
export const collectionGain = {
    crystal: 15,
    gas: 0
}

/**
 * 计算建筑加成的采集收益
 */
export const collectionGainWithBuildingSupport = (planet: Entitys.GameSimulatedPlanetPlanet, serverTimeDiff: number) => {
    const buildingHelper = new BuildingHelper(serverTimeDiff)

    // 基础采集收益
    let crystal = 0
    let gas = 0

    crystal += collectionGain.crystal
    gas += collectionGain.gas

    // 采集机收益
    planet.buildings.filter(building => building.type === 'diggerCrystal' && buildingHelper.getFinishedTime(building) > 0)
        .forEach(building => {
            crystal += buildingHelper.getEffectValue(building, 0)[0]
        })

    planet.buildings.filter(building => building.type === 'diggerGas' && buildingHelper.getFinishedTime(building) > 0)
        .forEach(building => {
            gas += buildingHelper.getEffectValue(building, 0)[0]
        })

    return { crystal, gas }
}