import  * as Sequelize from 'sequelize'
import * as config from '../../../config'

const sequelize = new Sequelize('woku', 'root', 'test', {
    host: config.dbHostName,
    port: 3306
})

var User = sequelize.define('user', {
    nickname: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
})

User.sync({force: true})