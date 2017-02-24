import { buildings, BuildingHelper } from '../../common/game-simulated-planet'
import { division } from '../../../components/math'

/**
 * 刷新星球状态
 * 遍历星球的所有建筑，让所有已经建造完毕的建筑生效
 * 建筑的收益，取『收益时长』与『建筑完成时长』中最小的值
 */
export default (planet: Entitys.GameSimulatedPlanetPlanet, startTime: number, serverTimeDiff: number) => {
    const buildingHelper = new BuildingHelper(serverTimeDiff)
    const endTime = new Date().getTime() + serverTimeDiff

    if (endTime < startTime) {
        throw new Error('时间错误')
    }

    // 计算收益时长
    const harvestTime = Math.abs(endTime - startTime)

    // 星球人口上限
    let populationLimit = 0

    // 增加的人口数
    let populationIncrement = 0

    // 星球总建筑占用空间
    let builtSize = 0

    // 增加的晶体矿
    let crystalIncrement = 0

    // 增加的瓦斯
    let gasIncrement = 0

    planet.buildings.forEach(building => {
        // 建造完成时间
        const buildingInfo = buildingHelper.getInfo(building)
        const finishedTime = buildingHelper.getFinishedTime(building)

        builtSize += buildingInfo.size

        // 只有建造完毕的建筑，才可能有收益
        // 已经升级，但还没升级完毕的，享受上一级的收益
        if (finishedTime > 0 || building.level > 1) {
            // TODO 给收益时间设置个峰值
            // 这个建筑最终收益时间
            const buildingHarvestTime = finishedTime > 0 ? Math.min(harvestTime, finishedTime) : harvestTime

            // 遍历建筑的功能
            buildingInfo.effects.forEach((effect, index) => {
                const effectValue = buildingHelper.getEffectValue(building, index)
                switch (effect) {
                    case 'population':
                        populationIncrement += division(effectValue[0] * buildingHarvestTime, 1000 * 60 * 60)
                        break
                    case 'populationLimit':
                        populationLimit += effectValue[0]
                        break
                    case 'crystal':
                        crystalIncrement += division(effectValue[0] * buildingHarvestTime, 1000 * 60 * 60)
                        break
                    case 'gas':
                        gasIncrement += division(effectValue[0] * buildingHarvestTime, 1000 * 60 * 60)
                        break
                }
            })
        }
    })

    // 增加人口，不能超过上限
    if (planet.population + populationIncrement > populationLimit) {
        populationIncrement = 0
    }

    planet.population += populationIncrement
    planet.crystal += crystalIncrement
    planet.gas += gasIncrement

    return {
        builtSize,
        populationLimit
    }
}