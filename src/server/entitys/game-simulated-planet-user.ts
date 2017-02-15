import {Entity, Column, PrimaryGeneratedColumn, OneToOne, UpdateDateColumn, OneToMany, JoinColumn} from 'typeorm'
import * as Validator from 'class-validator'
import Planet from './game-simulated-planet-planet'
import User from './user'

@Entity()
export default class GameSimulatedPlanetUser implements Entitys.GameSimulatedPlanetUser {
    @PrimaryGeneratedColumn({
        comment: '主键'
    })
    id: number

    /**
     * 用户表的外键
     */
    @OneToOne(type => User, user => user.gameSimulatedPlanetUser)
    @JoinColumn()
    user: User

    /**
     * 根据不同进度，会逐渐解锁功能
     */
    @Column({
        comment: '游戏进度',
        type: 'int',
        length: 3
    })
    @Validator.Min(0, {message: '最小为 0'})
    @Validator.Max(999, {message: '最大为 999'})
    progress: number = 0

    @Column({
        comment: '当前进度提示是否已读'
    })
    @Validator.IsBoolean()
    hasReadProgress: boolean = false

    /**
     * 玩家拥有星球的外键
     */
    @OneToMany(type => Planet, planet => planet.gameUser, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    planets: Planet[] = []

    @Column({
        comment: '上次计算收益时间'
    })
    lastHarvest: Date = new Date()
}