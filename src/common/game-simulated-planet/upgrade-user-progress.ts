import BuildingHelper from './building-helper'
import { buildingNames } from './names'

/**
 * 判断和执行用户进度提升
 */
export default (gameUser: Entitys.GameSimulatedPlanetUser, buildingHelper: BuildingHelper) => {
    switch (gameUser.progress) {
        case 0:
            if (gameUser.planets.findIndex(planet => planet.crystal >= 50) > -1) {
                gameUser.progress = 1
            }
            break
        case 1:
            if (
                gameUser.planets.filter(planet => {
                    return planet.buildings.filter(building => building.type === buildingNames.house)
                        .filter(building => buildingHelper.getFinishedTime(building) > 0)
                        .length >= 2
                }).length >= 1
            ) {
                gameUser.progress = 2
            }
            break
        case 2:
            if (
                gameUser.planets.filter(planet => {
                    return planet.buildings.filter(building => building.type === buildingNames.crystal)
                        .filter(building => buildingHelper.getFinishedTime(building) > 0)
                        .length >= 2
                }).length >= 1
            ) {
                gameUser.progress = 3
            }
            break
        case 3:
            if (
                gameUser.planets.filter(planet => {
                    return planet.buildings.filter(building => building.type === buildingNames.gas)
                        .filter(building => buildingHelper.getFinishedTime(building) > 0)
                        .length >= 1
                }).length >= 1
            ) {
                gameUser.progress = 4
            }
            break
        case 4:
            if (
                gameUser.planets.filter(planet => {
                    return planet.buildings.filter(building => building.type === buildingNames.diggerCrystal)
                        .filter(building => buildingHelper.getFinishedTime(building) > 0)
                        .length >= 1
                }).length >= 1
            ) {
                gameUser.progress = 5
            }
            break
        case 5:
            break
    }
}