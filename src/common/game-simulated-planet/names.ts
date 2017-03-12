/**
 * 建筑效果名
 * 数据库只会存储建筑名，不会存储建筑效果名，放心用 enum
 */
export enum buildingEffects {
    /**
     * 人口上限
     */
    populationLimit,
    /**
     * 人口
     */
    population,
    /**
     * 晶体矿
     */
    crystal,
    /**
     * 瓦斯
     */
    gas,
    /**
     * 采集晶体矿提升
     */
    diggerCrystal,
    /**
     * 采集瓦斯提升
     */
    diggerGas,
    /**
     * 自动采集
     */
    autoDigger
}

/**
 * 装备效果名
 * 数据库只会存储装备的 key，不会存储效果，因此放心用 enum
 */
export enum equipmentEffects {
    /**
     * 横排溅射 伤害,溅射率
     */
    horizontalSputtering,
    /**
     * 纵排溅射 伤害,溅射率
     */
    verticalSputtering,
    /**
     * 全体溅射 伤害,溅射率
     */
    allSputtering,
    /**
     * 增加燃料空间
     */
    fuel
}

/**
 * 装备 唯一 key
 * 会存储到数据库，因此用字符串
 */
export const equipmentKeys = {
    /**
     * 弹道1级
     */
    ballistic1: 'bl1',
    /**
     * 弹道2级
     */
    ballistic2: 'bl2',
    /**
     * 定向1级
     */
    directional1: 'di1',
    /**
     * 定向2级
     */
    directional2: 'di2',
    /**
     * 导弹1级
     */
    missile1: 'mi1',
    /**
     * 导弹2级
     */
    missile2: 'mi2',
    /**
     * 燃料仓1级
     */
    fuel1: 'fl1',
    /**
     * 燃料仓2级
     */
    fuel2: 'fl2'
}

/**
 * 战舰 唯一 key
 * 会存储到数据库，因此用字符串，不能超过5个字符
 */
export const warshipKeys = {
    /**
     * 侦察机1级
     */
    scout1: 'sc1',
    /**
     * 侦察机2级
     */
    scout2: 'sc2',
    /**
     * 巡航舰1级
     */
    frigate1: 'fr1',
    /**
     * 巡航舰2级
     */
    frigate2: 'fr2',
    /**
     * 驱逐舰1级
     */
    destroyer1: 'dt1',
    /**
     * 驱逐舰2级
     */
    destroyer2: 'dt2',
    /**
     * 航母1级
     */
    motherShip1: 'ms1',
    /**
     * 航母2级
     */
    motherShip2: 'ms2',
    /**
     * 泰坦1级
     */
    titan1: 'tt1',
    /**
     * 泰坦2级
     */
    titan2: 'tt2'
}