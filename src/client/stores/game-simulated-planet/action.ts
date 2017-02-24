import { UsersService } from '../../services'
import GameSimulatedPlanetStore from './store'
import { inject } from '../../../../components/dependency-inject'
import { GameSimulatedPlanetService } from '../../services'
import { planetFresh, BuildingHelper, upgradeUserProgress } from '../../../common/game-simulated-planet'
import { extendObservable } from '../../../../components/dynamic-object'

export default class GameSimulatedPlanetAction {
    @inject(GameSimulatedPlanetStore)
    public store: GameSimulatedPlanetStore

    /**
     * 游戏用户自动登录/注册
     */
    async loginAuthenticatedUser() {
        const result = await GameSimulatedPlanetService.getAuthenticatedUser()
        const currentTime = new Date().getTime()
        this.store.gameUser = result.user
        this.store.serverTimeDiff = result.currentTime - currentTime
        this.store.lastHarvest = currentTime
        this.store.buildingHelper = new BuildingHelper(this.store.serverTimeDiff)
    }

    /**
     * 采集
     */
    async collection(planetId: number) {
        const { crystal } = await GameSimulatedPlanetService.collection(planetId)
        this.store.gameUser.planets.find(planet => planet.id === planetId).crystal += crystal
    }

    /**
     * 建造建筑
     */
    async building(planetId: number, buildingName: string) {
        const building = await GameSimulatedPlanetService.building(planetId, buildingName)
        this.store.gameUser.planets.find(planet => planet.id === planetId).buildings.push(building)
    }

    /**
     * 拆除建筑
     */
    async destroyBuilding(planetId: number, buildingId: number) {
        await GameSimulatedPlanetService.destroyBuilding(planetId, buildingId)
        let buildings = this.store.gameUser.planets.find(planet => planet.id === planetId).buildings
        const deleteIndex = buildings.findIndex(building => building.id === buildingId)
        buildings.splice(deleteIndex, 1)
    }

    /**
     * 升级建筑
     */
    async upgradeBuilding(planetId: number, buildingId: number) {
        const building = await GameSimulatedPlanetService.upgradeBuilding(planetId, buildingId)
        let targetBuilding = this.store.gameUser.planets.find(planet => planet.id === planetId).buildings
            .find(building => building.id === buildingId)
        extendObservable(targetBuilding, building)
    }

    /**
    * 刷新当前星球状态信息
    */
    async freshCurrentPlanet() {
        const currentTime = new Date().getTime()
        const result = planetFresh(
            this.store.gameUser.planets[this.store.currentPlanetIndex],
            this.store.lastHarvest + this.store.serverTimeDiff,
            this.store.serverTimeDiff
        )

        this.store.lastHarvest = currentTime
        this.store.currentPlanetBuiltSize = result.builtSize
        this.store.currentPlanetPopulationLimit = result.populationLimit

        // // 刷新用户进度
        // upgradeUserProgress(this.store.authenticatedUser, this.store.buildingHelper)
    }
}