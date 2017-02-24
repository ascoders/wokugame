import BuildingHelper from './building-helper'

/**
 * 判断和执行用户进度提升
 */
export default (gameUser: Entitys.GameSimulatedPlanetUser, buildingHelper: BuildingHelper) => {
    switch (gameUser.progress) {
        case 0: // 晶体矿达到 50
            if (gameUser.planets.findIndex(planet => planet.crystal >= 50) > -1) {
                return {
                    ...gameUser,
                    progress: 1
                }
            }
            return gameUser
        case 1: // 有五个完成建造的生态球
            if (
                gameUser.planets.filter(planet => {
                    return planet.buildings.filter(building => building.type === 'house')
                            .filter(building => buildingHelper.getFinishedTime(building) > 0)
                            .length >= 5
                }).length >= 1
            ) {
                return {
                    ...gameUser,
                    progress: 2
                }
            } else {
                return gameUser
            }
        case 2: // 有五个完成建造的晶矿采掘厂
            if (
                gameUser.planets.filter(planet => {
                    return planet.buildings.filter(building => building.type === 'crystal')
                            .filter(building => buildingHelper.getFinishedTime(building) > 0)
                            .length >= 5
                }).length >= 1
            ) {
                return {
                    ...gameUser,
                    progress: 3
                }
            } else {
                return gameUser
            }
        default:
            return gameUser
    }
}