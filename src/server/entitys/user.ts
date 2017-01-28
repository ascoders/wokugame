import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import * as Validator from 'class-validator'

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number

    /**
     * 全局唯一，必须设置
     */
    @Column({
        comment: '用户昵称',
        length: 10,
        unique: true
    })
    @Validator.IsString({message: '必须为字符串'})
    @Validator.Length(2, 10, {message: '长度在 2~10'})
    nickname: string

    @Column({
        comment: '密码',
        length: 32,
        nullable: true
    })
    @Validator.ValidateIf(user => user.password !== null && user.password !== undefined)
    @Validator.IsString({message: '必须为字符串'})
    @Validator.Length(32, 32, {message: '加密后长度必须为 32'})
    password: string

    @Column({
        comment: '密码最大尝试次数',
        type: 'int',
        length: 1
    })
    @Validator.IsInt({message: '必须为整型'})
    @Validator.Min(0, {message: '最小为 0'})
    @Validator.Max(9, {message: '最大为 9'})
    passwordRetry: number

    @Column({
        comment: '邮箱',
        length: 30,
        nullable: true
    })
    @Validator.ValidateIf(user => user.email !== null && user.email !== undefined)
    @Validator.IsEmail(null, {message: '格式必须为 email'})
    email: string

    @CreateDateColumn({
        comment: '注册日期'
    })
    @Validator.ValidateIf(user => user.created !== undefined)
    @Validator.IsDate({message: '格式必须为日期'})
    created: Date

    @UpdateDateColumn({
        comment: '更新日期'
    })
    @Validator.ValidateIf(user => user.updated !== undefined)
    @Validator.IsDate({message: '格式必须为日期'})
    updated: Date
}