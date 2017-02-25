import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'
import * as Validator from 'class-validator'
import GamePlanet from './game-simulated-planet-planet'

@Entity()
export default class GameSimulatedPlanetBuilding implements Entitys.GameSimulatedPlanetBuilding {
    @PrimaryGeneratedColumn({
        comment: '主键'
    })
    id: number

    /**
     * GamePlanet 表的外键
     */
    @ManyToOne(type => GamePlanet, gamePlanet => gamePlanet.buildings)
    @JoinColumn()
    planet: GamePlanet

    @Column({
        comment: '建筑类型',
        type: 'string',
        length: 15
    })
    @Validator.IsString()
    @Validator.Length(1, 15, { message: '最小为 0' })
    type: string

    @Column({
        comment: '建筑等级',
        type: 'int',
        length: 2
    })
    @Validator.IsNumber()
    @Validator.Min(0, { message: '最小为 0' })
    @Validator.Max(99, { message: '最大为 99' })
    level: number = 1

    @Column({
        comment: '这个等级 建造/升级 开始的时间'
    })
    buildStart: Date = new Date()

    @Column({
        comment: '建筑初始建造时间'
    })
    created: Date = new Date()
}