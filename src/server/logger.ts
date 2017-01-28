import * as winston from 'winston'
import * as path from 'path'
import * as config from '../../config'
import * as fs from 'fs'

fs.existsSync(config.logDirectory) || fs.mkdirSync(config.logDirectory)

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: path.join(config.logDirectory, 'all.log'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        process.env.NODE_ENV !== 'production' && new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
})

export default logger