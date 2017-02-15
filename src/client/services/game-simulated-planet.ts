import iFetch from '../utils/fetch'

/**
 * 获取当前登录的用户
 */
export const getAuthenticatedUser = async() => {
    return await iFetch('/api/game-simulated-planet/user', {
        method: 'get'
    })
}

/**
 * 建造建筑
 */
export const building = async(planetId: number, buildingName: string) => {
    return await iFetch('/api/game-simulated-planet/building', {
        method: 'post',
        body: JSON.stringify({
            planetId,
            type: buildingName
        })
    })
}

/**
 * 拆除建筑
 */
export const destroyBuilding = async(planetId: number, buildingId: number) => {
    return await iFetch('/api/game-simulated-planet/building/' + buildingId, {
        method: 'delete',
        body: JSON.stringify({
            planetId
        })
    })
}

/**
 * 升级建筑
 */
export const upgradeBuilding = async(planetId: number, buildingId: number) => {
    return await iFetch('/api/game-simulated-planet/building/' + buildingId + '/upgrade', {
        method: 'post',
        body: JSON.stringify({
            planetId
        })
    })
}