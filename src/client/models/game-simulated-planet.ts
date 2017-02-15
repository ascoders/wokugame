import {model, Iaction} from '../../../components/reax'
import {GameSimulatedPlanetService} from '../services'
import {planetFresh, BuildingHelper, upgradeUserProgress} from '../../common/game-simulated-planet'

export class GameSimulatedStore {
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

export const GameSimulatedModel = model<GameSimulatedStore>({
    namespace: 'gameSimulated',
    state: new GameSimulatedStore(),
    reducers: {
        setGameUser: (state, action: Iaction<{
            user: Entitys.GameSimulatedPlanetUser
            serviceCurrentTime: number
        }>) => {
            const currentTime = new Date().getTime()
            const serverTimeDiff = action.payload.serviceCurrentTime - currentTime

            return {
                ...state,
                gameUser: action.payload.user,
                serverTimeDiff,
                lastHarvest: currentTime,
                buildingHelper: new BuildingHelper(serverTimeDiff)
            }
        },

        addBuilding: (state, action) => {
            return Object.assign({}, state, {
                gameUser: Object.assign({}, state.gameUser, {
                    planets: state.gameUser.planets.map((planet, index) => {
                        if (index === state.currentPlanetIndex) {
                            planet.buildings = planet.buildings.concat(action.payload)
                            return planet
                        }
                        return planet
                    })
                })
            })
        },

        removeBuilding: (state, action) => {
            return Object.assign({}, state, {
                gameUser: Object.assign({}, state.gameUser, {
                    planets: state.gameUser.planets.map((planet, index) => {
                        if (index === state.currentPlanetIndex) {
                            planet.buildings = planet.buildings.filter(building => building.id !== action.payload)
                            return planet
                        }
                        return planet
                    })
                })
            })
        },

        updateBuilding: (state, action: Iaction<{
            buildingId: number
            building: Entitys.GameSimulatedPlanetBuilding
        }>) => {
            return Object.assign({}, state, {
                gameUser: Object.assign({}, state, state.gameUser, {
                    planets: state.gameUser.planets.map((planet, index) => {
                        if (index === state.currentPlanetIndex) {
                            planet.buildings = planet.buildings.map(building => {
                                if (building.id === action.payload.buildingId) {
                                    return action.payload.building
                                }
                                return building
                            })
                            return planet
                        }
                        return planet
                    })
                })
            })
        },

        freshPlanet: (state, action) => {
            const currentTime = new Date().getTime()
            const result = planetFresh(state.gameUser.planets[state.currentPlanetIndex], state.lastHarvest + state.serverTimeDiff, state.serverTimeDiff)

            return Object.assign({}, state, {
                gameUser: Object.assign({}, state, state.gameUser, {
                    planets: state.gameUser.planets.map((planet, index) => {
                        if (index === state.currentPlanetIndex) {
                            return result.planet
                        }
                        return planet
                    })
                }),
                lastHarvest: currentTime,
                currentPlanetPopulationLimit: result.populationLimit,
                currentPlanetBuiltSize: result.builtSize
            })

            // // 刷新用户进度
            // upgradeUserProgress(this.store.authenticatedUser, this.store.buildingHelper)
        }
    }
})

export class GameSimulatedActions {
    /**
     * 游戏用户自动登录/注册
     */
    loginAuthenticatedUser = async() => {
        const {user, currentTime} = await GameSimulatedPlanetService.getAuthenticatedUser()
        return {
            type: 'gameSimulated/setGameUser',
            payload: {
                user,
                serviceCurrentTime: currentTime
            }
        }
    }

    /**
     * 建造建筑
     */
    building = async(gameUserId: number, buildingName: string) => {
        const building = await GameSimulatedPlanetService.building(gameUserId, buildingName)
        return {
            type: 'gameSimulated/addBuilding',
            payload: building
        }
    }

    /**
     * 拆除建筑
     */
    destroyBuilding = async(gameUserId: number, buildingId: number) => {
        await GameSimulatedPlanetService.destroyBuilding(gameUserId, buildingId)
        return {
            type: 'gameSimulated/removeBuilding',
            payload: buildingId
        }
    }

    /**
     * 升级建筑
     */
    upgradeBuilding = async(gameUserId: number, buildingId: number) => {
        const building = await GameSimulatedPlanetService.upgradeBuilding(gameUserId, buildingId)
        return {
            type: 'gameSimulated/updateBuilding',
            payload: {
                buildingId,
                building
            }
        }
    }

    /**
     * 刷新当前星球状态信息
     */
    freshCurrentPlanet = async() => {
        return {
            type: 'gameSimulated/freshPlanet'
        }
    }
}