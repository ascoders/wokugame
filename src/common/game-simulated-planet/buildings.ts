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

const buildings = new Map<string, BuildingInfo>()

buildings.set('house', {
    name: '生态球',
    description: '星球居民的栖身之所。提升人口上限，缓慢产生人口。',
    size: 1,
    progressNeed: 1,
    limit: 10,
    effects: ['populationLimit', 'population'],
    data: [
        [[30], [3 * 1000], [280], [190]], // 下一个开始系数是 1.2 1.1
        [[35], [5 * 1000], [360], [218]],
        [[47], [10 * 1000], [430], [276]],
        [[50], [15 * 1000], [520], [320]],
        [[62], [20 * 1000], [624], [352]],
        [[70], [30 * 1000], [750], [386]],
        [[98], [60 * 1000], [900], [425]], // 下一个开始系数是 1.3 1.2
        [[102], [60 * 1000 * 2], [1100], [510]],
        [[120], [60 * 1000 * 3], [1450], [590]],
        [[145], [60 * 1000 * 4], [1900], [680]]
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
        [[30], [3 * 1000], [280], [220]], // 下一个开始系数是 1.1
        [[35], [5 * 1000], [360], [242]],
        [[47], [10 * 1000], [430], [270]],
        [[50], [15 * 1000], [520], [297]],
        [[62], [20 * 1000], [624], [326]],
        [[70], [30 * 1000], [750], [360]],
        [[98], [60 * 1000], [900], [396]], // 下一个开始系数是 1.2
        [[102], [60 * 1000 * 2], [1100], [470]],
        [[120], [60 * 1000 * 3], [1450], [564]],
        [[145], [60 * 1000 * 4], [1900], [680]]
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