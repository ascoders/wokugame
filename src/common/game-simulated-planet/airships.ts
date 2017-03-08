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
    children: Array<{
        // 名称
        name: string
        // 空间
        size: number
        // 护盾
        shield: number
        // 耐久
        hp: number
    }>
}

export default [{
    name: '侦察机',
    description: '最轻量的宇宙飞船，特征 - 迅捷：30% 闪避概率',
    children: [{
        name: '翼龙号侦察机I型',
        size: 5,
        shield: 100,
        hp: 100
    }, {
        name: '翼龙号侦察机Ⅱ型',
        size: 6,
        shield: 100,
        hp: 150
    }]
}, {
    name: '巡航舰',
    description: '高护盾，中耐久，特征 - 自动充能：每秒恢复 2% 护盾',
    children: [{
        name: '阿科纳级巡航舰I型',
        size: 8,
        shield: 250,
        hp: 150
    }, {
        name: '阿科纳级巡航舰Ⅱ型',
        size: 10,
        shield: 300,
        hp: 200
    }]
}, {
    name: '驱逐舰',
    description: '中护盾，中耐久，特征 - 结构破坏：攻击有 35% 概率无视护盾',
    children: [{
        name: '爱国者驱逐舰I型',
        size: 8,
        shield: 150,
        hp: 150
    }, {
        name: '爱国者驱逐舰Ⅱ型',
        size: 10,
        shield: 200,
        hp: 200
    }]
}, {
    name: '航母',
    description: '高护盾，高耐久，高容量，高造价，特征 - 纳米维修：每秒恢复 1% 护盾和耐久',
    children: [{
        name: '尼米兹级航母I型',
        size: 10,
        shield: 300,
        hp: 300
    }, {
        name: '尼米兹级航母Ⅱ型',
        size: 13,
        shield: 400,
        hp: 400
    }]
}, {
    name: '泰坦',
    description: '超高护盾，超高耐久，超大容量，昂贵的造价，特征 - 纳米重组：每秒恢复 2% 护盾和耐久',
    children: [{
        name: '巨人泰坦I型',
        size: 20,
        shield: 800,
        hp: 600
    }, {
        name: '巨人泰坦Ⅱ型',
        size: 25,
        shield: 1200,
        hp: 900
    }]
}] as Airships[]