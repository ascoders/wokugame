import BuildingHelper from './building-helper'

/**
 * 判断和执行用户进度提升
 */
export default (gameUser: Entitys.GameSimulatedPlanetUser, buildingHelper: BuildingHelper) => {
    switch (gameUser.progress) {
        case 0: // 有一个完成建造的生态球
            gameUser.planets.forEach(planet => {
                const houseBuilding = planet.buildings.find(building => building.type === 'house')
                if (!houseBuilding) {
                    return
                }
                const finishedTime = buildingHelper.getFinishedTime(houseBuilding)
                if (finishedTime > 0) {
                    gameUser.progress = 1
                }
            })
            break
        case 1: // 有一个完成建造的晶矿采掘厂
            gameUser.planets.forEach(planet => {
                const crystalBuilding = planet.buildings.find(building => building.type === 'crystal')
                if (!crystalBuilding) {
                    return
                }
                const finishedTime = buildingHelper.getFinishedTime(crystalBuilding)
                if (finishedTime > 0) {
                    gameUser.progress = 2
                }
            })
            break
    }
}