import * as Sequelize from 'sequelize'
import {moduleName} from '../config'

export default new Sequelize(moduleName, 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})