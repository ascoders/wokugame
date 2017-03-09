/**
 * 装备
 */

// 武器
export interface ArmCategory {
    name: string
    description: string
    children: Array<Arm>
}

export interface Arm {
    // 名称
    name: string
    // 描述
    description: string
    // 伤害
    power: number
    // 占用空间
    size: number
    // 消耗
    crystal: number
    gas: number
    // 花费时间 毫秒
    time: number
}

export const arms: ArmCategory[] = [{
    name: '弹道',
    description: '对横排敌人 100% 溅射效果',
    children: [{
        name: '加特林机枪I型',
        power: 9,
        size: 1,
        crystal: 5,
        gas: 0,
        time: 1 * 1000
    }, {
        name: '加特林机枪Ⅱ型',
        description: '弹道型基础武器，对横排敌人 100% 溅射效果',
        power: 11,
        size: 1,
        crystal: 19,
        gas: 0,
        time: 3 * 1000
    }] as Arm[]
}, {
    name: '定向',
    description: '对纵排敌人 100% 溅射效果',
    children: [{
        name: '粒子炮I型',
        power: 18,
        size: 2,
        crystal: 6,
        gas: 0,
        time: 1 * 1000
    }, {
        name: '粒子炮Ⅱ型',
        description: '定向型基础武器，对纵排敌人 100% 溅射效果',
        power: 20,
        size: 2,
        crystal: 20,
        gas: 0,
        time: 3 * 1000
    }] as Arm[]
}, {
    name: '导弹',
    description: '对其他敌人 90% 溅射效果',
    children: [{
        name: '巡航导弹I型',
        power: 9,
        size: 3,
        crystal: 7,
        gas: 0,
        time: 1 * 1000
    }, {
        name: '巡航导弹Ⅱ型',
        description: '导弹型基础武器，对其他敌人 80% 溅射效果',
        power: 12,
        size: 3,
        crystal: 22,
        gas: 0,
        time: 3 * 1000
    }] as Arm[]
}]

