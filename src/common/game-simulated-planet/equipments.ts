/**
 * 装备
 */

// 武器
export interface Arm {
    // 名称
    name: string
    // 伤害
    power: number
    // 占用空间
    size: number
}

// 弹道
export const ballistic: Arm[] = [{
    name: '加特林机枪I型',
    power: 9,
    size: 1
}, {
    name: '加特林机枪Ⅱ型',
    power: 11,
    size: 1
}]


// 定向
export const directional: Arm[] = [{
    name: '粒子炮I型',
    power: 9,
    size: 1
}, {
    name: '粒子炮Ⅱ型',
    power: 10,
    size: 1
}]

// 导弹
export const missile: Arm[] = [{
    name: '巡航导弹I型',
    power: 3,
    size: 1
}, {
    name: '巡航导弹Ⅱ型',
    power: 4,
    size: 1
}]