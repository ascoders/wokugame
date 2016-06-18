/**
 * 连接 endless-battle 数据库
 * 返回 sequelize 对象
 */

import * as Sequelize from 'sequelize'

export default new Sequelize('endless-battle', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})