import iFetch from '../utils/fetch'

/**
 * 获取当前登录的用户
 */
export const getAuthenticatedUser = async () => {
    return await iFetch<{
        user: Entitys.GameSimulatedPlanetUser
        currentTime: number
    }>('/api/game-simulated-planet/user', {
        method: 'get'
    })
}

/**
 * 采集
 */
export const collection = async (planetId: number) => {
    return await iFetch<{
        crystal: number
        gas: number
    }>('/api/game-simulated-planet/collection', {
        method: 'post',
        body: JSON.stringify({
            planetId
        })
    })
}

/**
 * 建造建筑
 */
export const building = async (planetId: number, buildingName: string) => {
    return await iFetch<Entitys.GameSimulatedPlanetBuilding>('/api/game-simulated-planet/building', {
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
export const destroyBuilding = async (planetId: number, buildingId: number) => {
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
export const upgradeBuilding = async (planetId: number, buildingId: number) => {
    return await iFetch<Entitys.GameSimulatedPlanetBuilding>('/api/game-simulated-planet/building/' + buildingId + '/upgrade', {
        method: 'post',
        body: JSON.stringify({
            planetId
        })
    })
}

/**
 * 设计战舰
 */
export const designWarship = async (planetId: number, warship: Entitys.GameSimulatedPlanetWarship) => {
    return await iFetch('/api/game-simulated-planet/designWarship', {
        method: 'post',
        body: JSON.stringify({
            planetId, warship
        })
    })
}

/**
 * 查看战舰设计图列表
 */
export const getDesignWarship = async (planetId: number) => {
    return await iFetch<Array<Entitys.GameSimulatedPlanetWarship>>(`/api/game-simulated-planet/planet/${planetId}/warships`, {
        method: 'get'
    })
}

/**
 * 删除设计图
 */
export const deleteWarship = async (warshipId: number) => {
    return await iFetch('/api/game-simulated-planet/warship/delete', {
        method: 'post',
        body: JSON.stringify({
            warshipId
        })
    })
}