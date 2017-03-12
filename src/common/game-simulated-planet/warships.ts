import { warshipKeys } from './names'

/**
 * 战机分为 侦察机 巡航舰 驱逐舰 航母 和 泰坦
 */

/**
 * 战舰分类
 */
export interface Warships {
    /**
     * 分类名
     */
    name: string
    /**
     * 分类介绍
     */
    description: string
    /**
     * 子元素
     */
    children: Array<Warship>
}

/**
 * 战舰基础属性
 */
export interface Warship {
    /**
     * 唯一 key
     */
    key: string
    /**
     * 名称
     */
    name: string
    /**
     * 装备空间
     */
    size: number
    /**
     * 燃料空间，战斗会不断消耗燃料
     */
    fuel: number
    /**
     * 护盾
     */
    shield: number
    /**
     * 耐久
     */
    hp: number
    /**
     * 晶体矿消耗
     */
    crystal: number
    /**
     * 瓦斯消耗
     */
    gas: number
    /**
     * 基础耗时 毫秒
     */
    time: number
    /**
     * 展示攻击力，这个攻击力在真正战斗时会重新计算（考虑到不同武器有不同的溅射效果）
     */
    power?: number
}

/**
 * 战舰列表，用来显示
 */
const warshipList: Warships[] = [{
    name: '侦察机',
    description: '最轻量的宇宙飞船，特征 - 迅捷：30% 闪避概率',
    children: [{
        key: warshipKeys.scout1,
        name: '翼龙号侦察机I型',
        size: 5,
        fuel: 1000,
        shield: 300,
        hp: 300,
        crystal: 10,
        gas: 0,
        time: 1 * 1000
    }, {
        key: warshipKeys.scout2,
        name: '翼龙号侦察机Ⅱ型',
        size: 6,
        fuel: 2000,
        shield: 300,
        hp: 450,
        crystal: 20,
        gas: 0,
        time: 2 * 1000
    }]
}, {
    name: '巡航舰',
    description: '高护盾，中耐久，特征 - 自动充能：每秒恢复 2% 护盾',
    children: [{
        key: warshipKeys.frigate1,
        name: '阿科纳级巡航舰I型',
        size: 8,
        fuel: 1500,
        shield: 750,
        hp: 500,
        crystal: 50,
        gas: 2,
        time: 2 * 1000
    }, {
        key: warshipKeys.frigate2,
        name: '阿科纳级巡航舰Ⅱ型',
        size: 10,
        fuel: 3000,
        shield: 900,
        hp: 600,
        crystal: 100,
        gas: 4,
        time: 4 * 1000
    }]
}, {
    name: '驱逐舰',
    description: '中护盾，中耐久，特征 - 结构破坏：攻击有 35% 概率无视护盾',
    children: [{
        key: warshipKeys.destroyer1,
        name: '爱国者驱逐舰I型',
        size: 8,
        fuel: 2000,
        shield: 600,
        hp: 600,
        crystal: 55,
        gas: 2,
        time: 2 * 1000
    }, {
        key: warshipKeys.destroyer2,
        name: '爱国者驱逐舰Ⅱ型',
        size: 10,
        fuel: 4000,
        shield: 750,
        hp: 750,
        crystal: 95,
        gas: 4,
        time: 4 * 1000
    }]
}, {
    name: '航母',
    description: '高护盾，高耐久，高容量，高造价，特征 - 纳米维修：每秒恢复 1% 护盾和耐久',
    children: [{
        key: warshipKeys.motherShip1,
        name: '尼米兹级航母I型',
        size: 10,
        fuel: 7000,
        shield: 900,
        hp: 900,
        crystal: 180,
        gas: 10,
        time: 8 * 1000
    }, {
        key: warshipKeys.motherShip2,
        name: '尼米兹级航母Ⅱ型',
        size: 13,
        fuel: 14000,
        shield: 1200,
        hp: 1200,
        crystal: 400,
        gas: 25,
        time: 16 * 1000
    }]
}, {
    name: '泰坦',
    description: '超高护盾，超高耐久，超大容量，昂贵的造价，特征 - 纳米重组：每秒恢复 2% 护盾和耐久',
    children: [{
        key: warshipKeys.titan1,
        name: '巨人泰坦I型',
        size: 20,
        fuel: 20000,
        shield: 1800,
        hp: 1500,
        crystal: 2000,
        gas: 100,
        time: 60 * 1000
    }, {
        key: warshipKeys.titan2,
        name: '巨人泰坦Ⅱ型',
        size: 25,
        fuel: 40000,
        shield: 2600,
        hp: 2200,
        crystal: 6000,
        gas: 300,
        time: 120 * 1000
    }]
}]

/**
 * 所有战舰
 */
const warships = new Map<string, Warship>()
warshipList.forEach(warshipCategory => warshipCategory.children.forEach(warship => warships.set(warship.key, warship)))

export { warshipList, warships }