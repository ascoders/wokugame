/**
 * 战机分为 侦察机 巡航舰 驱逐舰 航母 和 泰坦
 */

export interface Airships {
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
    children: Array<Airship>
}

export interface Airship {
    // 名称
    name: string
    // 空间
    size: number
    // 护盾
    shield: number
    // 耐久
    hp: number
    // 基础造价
    crystal: number
    gas: number
    // 基础耗时 毫秒
    time: number
}

export default [{
    name: '侦察机',
    description: '最轻量的宇宙飞船，特征 - 迅捷：30% 闪避概率',
    children: [{
        name: '翼龙号侦察机I型',
        size: 5,
        shield: 300,
        hp: 300,
        crystal: 10,
        gas: 0,
        time: 1 * 1000
    }, {
        name: '翼龙号侦察机Ⅱ型',
        size: 6,
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
        name: '阿科纳级巡航舰I型',
        size: 8,
        shield: 750,
        hp: 500,
        crystal: 50,
        gas: 2,
        time: 2 * 1000
    }, {
        name: '阿科纳级巡航舰Ⅱ型',
        size: 10,
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
        name: '爱国者驱逐舰I型',
        size: 8,
        shield: 600,
        hp: 600,
        crystal: 55,
        gas: 2,
        time: 2 * 1000
    }, {
        name: '爱国者驱逐舰Ⅱ型',
        size: 10,
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
        name: '尼米兹级航母I型',
        size: 10,
        shield: 900,
        hp: 900,
        crystal: 180,
        gas: 10,
        time: 8 * 1000
    }, {
        name: '尼米兹级航母Ⅱ型',
        size: 13,
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
        name: '巨人泰坦I型',
        size: 20,
        shield: 1800,
        hp: 1500,
        crystal: 2000,
        gas: 100,
        time: 60 * 1000
    }, {
        name: '巨人泰坦Ⅱ型',
        size: 25,
        shield: 2600,
        hp: 2200,
        crystal: 6000,
        gas: 300,
        time: 120 * 1000
    }]
}] as Airships[]