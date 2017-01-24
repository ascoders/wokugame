import * as express from 'express'
import * as config from '../../config'
import * as path from 'path'
import myGraphQLSchema from '../graphql/schema'
import templateHtml from '../client/html'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'
import './models'

import userRouter from './controllers/user'

const app = express()

// 编译后的静态文件路径
const builtStaticPath = process.env.NODE_ENV === 'production' ? 'built-production/static' : 'built/static'

/**
 * 压缩资源
 */
app.use(compression())

/**
 * 设置静态资源缓存
 */
app.use('/static', express.static(builtStaticPath))

/**
 * 解析请求 body
 */
app.use('/api', bodyParser())

/**
 * 接口
 */
app.use('/api', userRouter)

/**
 * 默认输出页面模板
 */
app.get('*', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(templateHtml)
})

/**
 * 捕获最上层错误
 */
process.on('uncaughtException', (err: any) => {
    console.log('uncaughtException', err)
})

/**
 * 捕获最上层 promise 抛出的错误
 */
process.on('unhandledRejection', (err: any) => {
    console.log('unhandledRejection', err)
})

/**
 * 捕获应用抛出的错误
 */
interface Error {
    status?: number
    message?: string
}

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).send({
        message: err.message,
        error: err
    })
})

/**
 * 监听端口
 */
app.listen(config.localPort, function () {
    console.log(`woku app listening on port ${config.localPort}!`)
})