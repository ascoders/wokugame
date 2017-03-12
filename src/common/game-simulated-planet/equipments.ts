import { Warship } from './warships'
import { equipmentEffects, equipmentKeys } from './names'

// 武器
export interface ArmCategory {
    name: string
    description: string
    children: Array<Equipment>
}

export interface Equipment {
    // 唯一 key
    key: string
    // 名称
    name: string
    // 占用空间
    size: number
    // 消耗
    crystal: number
    gas: number
    // 花费时间 毫秒
    time: number
    // 效果
    effects: number[]
    // 效果数据
    data: Array<Array<number>>
}

/**
 * 武器列表
 */
export const arms: ArmCategory[] = [{
    name: '弹道',
    description: '对横排敌人溅射',
    children: [{
        key: equipmentKeys.ballistic1,
        name: '加特林机枪I型',
        size: 1,
        crystal: 5,
        gas: 0,
        time: 1 * 1000,
        effects: [equipmentEffects.horizontalSputtering],
        data: [[9, 50]]
    }, {
        key: equipmentKeys.ballistic2,
        name: '加特林机枪Ⅱ型',
        size: 1,
        crystal: 19,
        gas: 0,
        time: 3 * 1000,
        effects: [equipmentEffects.horizontalSputtering],
        data: [[11, 50]]
    }]
}, {
    name: '定向',
    description: '对纵排敌人溅射',
    children: [{
        key: equipmentKeys.directional1,
        name: '粒子炮I型',
        size: 2,
        crystal: 6,
        gas: 0,
        time: 1 * 1000,
        effects: [equipmentEffects.verticalSputtering],
        data: [[18, 45]]
    }, {
        key: equipmentKeys.directional2,
        name: '粒子炮Ⅱ型',
        size: 2,
        crystal: 20,
        gas: 0,
        time: 3 * 1000,
        effects: [equipmentEffects.verticalSputtering],
        data: [[20, 45]]
    }]
}, {
    name: '导弹',
    description: '对所有敌人溅射',
    children: [{
        key: equipmentKeys.missile1,
        name: '巡航导弹I型',
        size: 3,
        crystal: 7,
        gas: 0,
        time: 1 * 1000,
        effects: [equipmentEffects.allSputtering],
        data: [[9, 33]]
    }, {
        key: equipmentKeys.missile2,
        name: '巡航导弹Ⅱ型',
        size: 3,
        crystal: 22,
        gas: 0,
        time: 3 * 1000,
        effects: [equipmentEffects.allSputtering],
        data: [[12, 33]]
    }]
}]

// 装备
export interface EquipmentCategory {
    name: string
    description: string
    children: Array<Equipment>
}

/**
 * 装备列表
 */
export const equipments: Array<EquipmentCategory> = [{
    name: '辅助',
    description: '增强战舰的续航能力',
    children: [{
        key: equipmentKeys.fuel1,
        name: '燃料仓Ⅰ型',
        size: 1,
        crystal: 3,
        gas: 0,
        time: 1 * 1000,
        effects: [equipmentEffects.fuel],
        data: [[500]]
    }, {
        key: equipmentKeys.fuel2,
        name: '燃料仓Ⅱ型',
        size: 1,
        crystal: 8,
        gas: 0,
        time: 1 * 2000,
        effects: [equipmentEffects.fuel],
        data: [[1000]]
    }]
}]

/**
 * 武器 & 装备 索引
 */
export const allEquipments = new Map<string, Equipment>()
arms.forEach(armCategory => armCategory.children.forEach(arm => allEquipments.set(arm.key, arm)))
equipments.forEach(equipmentCategory => equipmentCategory.children.forEach(equipment => allEquipments.set(equipment.key, equipment)))

/**
 * 给某个战舰装备上武器或装备
 */
export function putOnEquipment(warship: Warship, equipmentName: string) {
    const equipmenet = allEquipments.get(equipmentName)
    if (!equipmenet) {
        return
    }

    // 初始化属性，便于后续赋值
    if (!warship.power) {
        warship.power = 0
    }

    equipmenet.effects.forEach((effectKey, index) => {
        warship.crystal += equipmenet.crystal
        warship.gas += equipmenet.gas
        warship.time += equipmenet.time

        // 装备效果的数值 number[]
        const effectValue = equipmenet.data[index]
        switch (effectKey) {
            case equipmentEffects.horizontalSputtering:
                warship.power += effectValue[0]
                break
            case equipmentEffects.verticalSputtering:
                warship.power += effectValue[0]
                break
            case equipmentEffects.allSputtering:
                warship.power += effectValue[0]
                break
            case equipmentEffects.fuel:
                warship.fuel += effectValue[0]
                break
        }
    })

}