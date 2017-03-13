import { equipmentEffects, buildingEffects } from './names'

/**
 * 建筑效果
 */
const buildingEffectDescription = new Map<number, string>([
    [buildingEffects.populationLimit, '人口上限提高 %d'],
    [buildingEffects.population, '每小时提供 %d 人口'],
    [buildingEffects.crystal, '每小时提供 %d 晶体矿'],
    [buildingEffects.gas, '每小时提供 %d 瓦斯'],
    [buildingEffects.diggerCrystal, '每次采集晶体矿增加 %d'],
    [buildingEffects.diggerGas, '每次采集瓦斯增加 %d'],
    [buildingEffects.productWarship, '造舰数量提升 %d，提高造舰效率 %d'],
    [buildingEffects.autoDigger, '自动采集']
])

/**
 * 装备效果
 */
const equipmentEffectDescription = new Map<number, string>([
    [equipmentEffects.horizontalSputtering, '攻击力 %d, 横排 %d% 溅射'],
    [equipmentEffects.verticalSputtering, '攻击力 %d, 纵排 %d% 溅射'],
    [equipmentEffects.allSputtering, '攻击力 %d, 全体 %d% 溅射'],
    [equipmentEffects.fuel, '增加 %d 燃料仓空间']
])

export { buildingEffectDescription, equipmentEffectDescription }