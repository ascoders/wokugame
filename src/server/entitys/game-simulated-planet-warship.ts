import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'
import * as Validator from 'class-validator'
import GamePlanet from './game-simulated-planet-planet'
import GameBuilding from './game-simulated-planet-building'

@Entity()
export default class GameSimulatedPlanetWarship implements Entitys.GameSimulatedPlanetWarship {
    @PrimaryGeneratedColumn({
        comment: '主键'
    })
    id: number

    /**
     * GamePlanet 表的外键
     */
    @Column({
        type: 'int'
    })
    planetId: number

    @Column({
        comment: '用户起的名字',
        type: 'string',
        length: 15
    })
    @Validator.IsString({ message: '必须为字符串' })
    @Validator.Length(2, 15, { message: '长度为 2~15' })
    name: string

    @Column({
        comment: '战舰的 key',
        type: 'string',
        length: 5
    })
    @Validator.IsString({ message: '必须为字符串' })
    @Validator.Length(1, 15, { message: '长度为 1~15' })
    key: string

    @Column({
        comment: '装备列表',
        type: 'json'
    })
    equipments: any

    @Column({
        comment: '拥有数量',
        type: 'int',
        length: 11
    })
    count: number = 0
}