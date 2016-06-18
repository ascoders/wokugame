import * as Sequelize from 'sequelize'
import sequelize from '../connect'

export const member = sequelize.define('member', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    name: {
        type: Sequelize.STRING(10),
        unique: true,
        comment: '用户名'
    },

    create: {
        type: Sequelize.DATE,
        comment: '注册时间'
    }
})