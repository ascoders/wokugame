import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'
import * as Validator from 'class-validator'
import GameUser from './game-simulated-planet-user'
import GameBuilding from './game-simulated-planet-building'

@Entity()
export default class GameSimulatedPlanetPlanet implements Entitys.GameSimulatedPlanetPlanet {
    @PrimaryGeneratedColumn({
        comment: '主键'
    })
    id: number

    /**
     * GameUser 表的外键
     */
    @ManyToOne(type => GameUser, gameUser => gameUser.planets)
    @JoinColumn()
    gameUser: GameUser

    @Column({
        comment: '总人口数',
        type: 'decimal',
        precision: 9 + 7,
        scale: 7
    })
    @Validator.IsNumber({message: '必须为数字'})
    @Validator.Min(0, {message: '最小为 0'})
    @Validator.Max(200000000, {message: '最大为 200000000'})
    population: number = 0

    @Column({
        comment: '晶体矿',
        type: 'decimal',
        precision: 9 + 7,
        scale: 7
    })
    @Validator.IsNumber({message: '必须为数字'})
    @Validator.Min(0, {message: '最小为 0'})
    @Validator.Max(999999999, {message: '最大为 999999999'})
    crystal: number = 25

    /**
     * 瓦斯获取难度是晶体矿的 4 倍
     */
    @Column({
        comment: '瓦斯',
        type: 'decimal',
        precision: 9 + 7,
        scale: 7
    })
    @Validator.IsNumber({message: '必须为数字'})
    @Validator.Min(0, {message: '最小为 0'})
    @Validator.Max(999999999, {message: '最大为 999999999'})
    gas: number = 0

    @Column({
        comment: '星球发展阶段',
        type: 'int',
        length: 2
    })
    @Validator.Min(0, {message: '最小为 0'})
    @Validator.Max(99, {message: '最大为 99'})
    progress: number = 0

    @Column({
        comment: '建造空间',
        type: 'int',
        length: 2
    })
    @Validator.Min(0, {message: '最小为 0'})
    @Validator.Max(99, {message: '最大为 99'})
    size: number = 45

    /**
     * 星球拥有建筑的外键
     */
    @OneToMany(type => GameBuilding, gameBuilding => gameBuilding.planet, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    buildings: GameBuilding[] = []
}