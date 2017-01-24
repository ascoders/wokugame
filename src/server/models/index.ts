import  * as Sequelize from 'sequelize'
import * as config from '../../../config'

import * as user from './user'

const db = new Sequelize('woku', 'root', 'test', {
    host: config.dbHostName,
    port: 3306
})


let User = user.model(db)

db.sync({force: true})

export {
    User
}