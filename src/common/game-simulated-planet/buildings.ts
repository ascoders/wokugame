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
    progressNeed: 1,
    limit: 10,
    effects: ['populationLimit', 'population'],
    data: [
        [[50], [60 * 1000], [3000], [200]],
        [[150], [60 * 1000 * 3], [5000], [230]],
        [[400], [60 * 1000 * 10], [8000], [270]],
        [[1000], [60 * 1000 * 30], [10000], [310]]
    ]
})

buildings.set('crystal', {
    name: '晶矿采掘厂',
    description: '开采并加工晶体矿，为星球源源不断提供晶体矿',
    size: 1,
    progressNeed: 2,
    limit: 10,
    effects: ['crystal'],
    data: [
        [[50], [60 * 1000], [500]],
        [[200], [60 * 1000 * 3], [550]],
        [[500], [60 * 1000 * 10], [620]],
        [[1200, 20], [60 * 1000 * 30], [701]]
    ]
})

buildings.set('gas', {
    name: '瓦斯精炼厂',
    description: '开采并提炼珍贵的瓦斯，这种高级资源主要用来提升建筑与舰队强度',
    size: 1,
    progressNeed: 3,
    limit: 5,
    effects: ['gas'],
    data: [
        [[150], [60 * 1000 * 5], [120]],
        [[450], [60 * 1000 * 15], [106]],
        [[850], [60 * 1000 * 60], [200]],
        [[1500], [60 * 1000 * 90], [205]]
    ]
})

buildings.set('digger', {
    name: '自动采集机',
    description: '建造后，采集按钮将自动点击',
    size: 2,
    progressNeed: 4,
    limit: 1,
    effects: ['digger'],
    data: [
        [[10000], [60 * 1000 * 60]]
    ]
})

export default buildings
export const buildingList = ['house', 'crystal', 'gas', 'digger']