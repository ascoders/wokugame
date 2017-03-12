import { buildingEffects } from './names'

export interface BuildingInfo {
    // 名称
    name: string
    // 介绍
    description: string
    // 占用空间
    size: number
    // 多少级用户进度才能建造
    progressNeed: number
    // 最多建造多少个
    limit: number
    // 效果
    effects: number[]
    // 每一级，各项指标，分别是：
    // index = 0 | 升级消耗, [x, y] 分别是 晶体矿 瓦斯
    // index = 1 | 升级耗时/建造耗时(毫秒)，数组长度固定为 1
    // index = 2.. 第 index-1 个效果数值
    data: Array<Array<Array<number>>>
}

const buildings = new Map<string, BuildingInfo>()

buildings.set('house', {
    name: '生态球',
    description: '星球居民的栖身之所。提升人口上限，缓慢产生人口',
    size: 1,
    progressNeed: 1,
    limit: 5,
    effects: [buildingEffects.populationLimit, buildingEffects.population],
    data: [
        [[30, 0], [3 * 1000], [280], [190]], // 下一个开始系数是 1.2 1.1
        [[35, 0], [5 * 1000], [360], [218]],
        [[47, 0], [10 * 1000], [430], [276]],
        [[50, 0], [15 * 1000], [520], [320]],
        [[62, 0], [20 * 1000], [624], [352]],
        [[70, 0], [30 * 1000], [750], [386]],
        [[98, 0], [60 * 1000], [900], [425]], // 下一个开始系数是 1.3 1.2
        [[102, 0], [60 * 1000 * 2], [1100], [510]],
        [[120, 0], [60 * 1000 * 3], [1450], [590]],
        [[145, 0], [60 * 1000 * 4], [1900], [680]]
    ]
})

buildings.set('crystal', {
    name: '晶矿采掘厂',
    description: '开采并加工晶体矿，为星球源源不断提供晶体矿',
    size: 1,
    progressNeed: 2,
    limit: 5,
    effects: [buildingEffects.crystal],
    data: [
        [[30, 0], [3 * 1000], [280], [220]], // 下一个开始系数是 1.1
        [[35, 0], [5 * 1000], [360], [242]],
        [[47, 0], [10 * 1000], [430], [270]],
        [[50, 0], [15 * 1000], [520], [297]],
        [[62, 0], [20 * 1000], [624], [326]],
        [[70, 0], [30 * 1000], [750], [360]],
        [[98, 0], [60 * 1000], [900], [396]], // 下一个开始系数是 1.2
        [[102, 0], [60 * 1000 * 2], [1100], [470]],
        [[120, 0], [60 * 1000 * 3], [1450], [564]],
        [[145, 0], [60 * 1000 * 4], [1900], [680]]
    ]
})

buildings.set('gas', {
    name: '瓦斯精炼厂',
    description: '开采并提炼珍贵的瓦斯，这种高级资源主要用来提升建筑与舰队强度',
    size: 1,
    progressNeed: 3,
    limit: 3,
    effects: [buildingEffects.gas],
    data: [
        [[40, 0], [5 * 1000], [36]],
        [[67, 0], [10 * 1000], [39]],
        [[75, 0], [15 * 1000], [43]],
        [[89, 0], [20 * 1000], [50]],
        [[98, 0], [30 * 1000], [58]]
    ]
})

buildings.set('diggerCrystal', {
    name: '晶体矿采集机',
    description: '增加每次采集的晶体矿收益',
    size: 2,
    progressNeed: 4,
    limit: 2,
    effects: [buildingEffects.diggerCrystal],
    data: [
        [[50, 0], [10 * 1000], [1]],
        [[200, 0], [20 * 1000], [3]]
    ]
})

buildings.set('diggerGas', {
    name: '瓦斯采集机',
    description: '增加每次采集的瓦斯收益',
    size: 2,
    progressNeed: 4,
    limit: 2,
    effects: [buildingEffects.diggerGas],
    data: [
        [[0, 1], [10 * 1000], [1]],
        [[0, 60], [20 * 1000], [2]]
    ]
})

buildings.set('autoDigger', {
    name: '自动采集机',
    description: '采集按钮将自动点击（离线也生效）',
    size: 3,
    progressNeed: 5,
    limit: 1,
    effects: [buildingEffects.autoDigger],
    data: [
        [[12000, 1000], [60 * 1000 * 60 * 6]]
    ]
})

export default buildings
export const buildingList = ['house', 'crystal', 'gas', 'diggerCrystal', 'diggerGas', 'autoDigger']