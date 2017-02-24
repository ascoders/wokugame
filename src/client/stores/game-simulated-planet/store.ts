import { BuildingHelper } from '../../../common/game-simulated-planet'

export default class GameSimulatedPlanetStore {
    /**
     * 游戏用户
     */
    gameUser?: Entitys.GameSimulatedPlanetUser

    /**
     * 当前选择星球的 index
     */
    currentPlanetIndex = 0

    /**
     * 当前星球人口上限
     */
    currentPlanetPopulationLimit = 0

    /**
     * 当前星球建筑已占用空间
     */
    currentPlanetBuiltSize = 0

    /**
     * 最近一次同步时，与服务器的时间差
     */
    serverTimeDiff = 0

    /**
     * 最后一次获取收益的时间
     */
    lastHarvest = 0

    /**
     * 获取 buildingHelper 方法类
     */
    buildingHelper: BuildingHelper
}