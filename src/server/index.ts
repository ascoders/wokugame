import * as express from 'express'
import * as config from '../../config'
import templateHtml from '../client/html'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'
import logger from './logger'
import * as morgan from 'morgan'
import 'reflect-metadata'
import db from './db'
import routes from './routes'
import * as expressSession from 'express-session'
import * as cookieParser from 'cookie-parser'
import * as connectRedis from 'connect-redis'
import * as fs from 'fs'
import * as path from 'path'

/**
 * 捕获最上层错误
 */
process.on('uncaughtException', (error: any) => {
    logger.error('uncaughtException', error)
})

/**
 * 捕获最上层 promise 抛出的错误
 */
process.on('unhandledRejection', (error: any) => {
    logger.error('unhandledRejection', error)
})

const start = async() => {
    const app = express()

    /**
     * 日志处理
     */
    app.use(morgan('combined', {
        stream: {
            write: message => logger.error(message.trim())
        },
        skip: (req, res) => res.statusCode < 400
    }))

    /**
     * session 中间件
     */
    const RedisStore = connectRedis(expressSession)
    app.use(expressSession({
        secret: config.sessionSecret,
        cookie: {
            maxAge: config.sessionMaxAge
        },
        saveUninitialized: false,
        resave: false,
        store: new RedisStore({
            host: config.redisHostName,
            port: config.redisPort
        })
    }))

    /**
     * cookie 中间件
     */
    app.use(cookieParser(config.sessionSecret))

    /**
     * 压缩资源
     */
    app.use(compression())

    /**
     * 设置静态资源缓存
     */

        // 编译后的静态文件路径
    const builtStaticPath = process.env.NODE_ENV === 'production' ? 'built-production/static' : 'built/static'
    app.use('/static', express.static(builtStaticPath))

    /**
     * 解析请求 body
     */
    app.use('/api', bodyParser.json())
    app.use('/api', bodyParser.urlencoded({extended: true}))

    /**
     * 接口
     */

    // 等待数据库连接 ready
    try {
        await db
    } catch (error) {
        console.log('数据库连接失败', db)
    }

    app.use('/api', routes())

    /**
     * 默认输出页面模板
     */
    app.get('*', (req, res) => {
        res.set('Content-Type', 'text/html')
        res.send(templateHtml)
    })

    /**
     * 捕获应用抛出的错误
     */
    interface Error {
        status?: number
        message?: string
    }

    app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(error.status || 500).send({
            message: error.message
        })
        logger.error('handledError', error, {requestParam: req.body})
    })

    /**
     * 监听端口
     */
    app.listen(config.localPort, () => {
        // 开发模式弹窗，告知已重启 node 服务
        if (process.env.NODE_ENV !== 'production') {
            const notifier = require('node-notifier')
            notifier.notify(`server start on port: ${config.localPort}`)
        }
    })
}

start()