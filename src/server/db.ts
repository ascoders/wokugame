import {createConnection} from 'typeorm'
import * as config from '../../config'
import * as path from 'path'

export default createConnection({
    driver: {
        type: 'mysql',
        host: config.dbHostName,
        port: config.dbPort,
        username: 'root',
        password: 'test',
        database: 'woku'
    },
    entities: [
        path.join(__dirname, 'entitys/*.js')
    ],
    subscribers: [
        path.join(__dirname, "subscribers/*.js")
    ],
    autoSchemaSync: true
})