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
    effects: string[]
    // 每一级，各项指标，分别是：
    // 升级消耗黄金，第[0]个是建造时消耗的黄金数
    // 升级耗时(毫秒)，第[1]个是建造时耗时
    // 第一个效果数值
    // 第二个效果数值
    data: Array<Array<Array<number>>>
}

const buildings = new Map<string,BuildingInfo>()

buildings.set('house', {
    name: '生态球',
    description: '星球居民的栖身之所。提升人口上限，缓慢产生人口。',
    size: 1,
    progressNeed: 0,
    limit: 10,
    effects: ['populationLimit', 'population'],
    data: [
        [[5], [60 * 1000], [300], [20]],
        [[25], [60 * 1000 * 3], [500], [23]],
        [[75], [60 * 1000 * 10], [800], [27]],
        [[175], [60 * 1000 * 30], [1000], [31]]
    ]
})

buildings.set('crystal', {
    name: '晶矿采掘厂',
    description: '开采并加工晶体矿，为星球源源不断提供晶体矿',
    size: 1,
    progressNeed: 1,
    limit: 10,
    effects: ['crystal'],
    data: [
        [[5], [60 * 1000], [50]],
        [[35], [60 * 1000 * 3], [55]],
        [[125], [60 * 1000 * 10], [62]],
        [[200, 20], [60 * 1000 * 30], [71]]
    ]
})

buildings.set('gas', {
    name: '瓦斯精炼厂',
    description: '开采并提炼珍贵的瓦斯，这种高级资源主要用来提升建筑与舰队强度',
    size: 1,
    progressNeed: 2,
    limit: 5,
    effects: ['gas'],
    data: [
        [[150], [60 * 1000 * 5], [12]],
        [[450], [60 * 1000 * 15], [16]],
        [[850], [60 * 1000 * 60], [20]],
        [[1200], [60 * 1000 * 90], [25]]
    ]
})

export default buildings
export const buildingList = ['house', 'crystal', 'gas']