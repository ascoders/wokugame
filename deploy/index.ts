import * as http from 'http'
import * as createHandler from 'github-webhook-handler'
import {execSync} from 'child_process'
import * as config from '../config'
const handler = createHandler({path: '/webhook', secret: '123456'})

/**
 * 启动网站服务
 */
execSync(`npm run deploy`)

/**
 * 监听网络请求
 */
http.createServer((req, res) => {
    // webhook 的转发给 github-webhook-handle
    if (req.url === '/webhook') {
        handler(req, res, (err: any) => {
            res.statusCode = 404
            res.end('no such location')
        })
    }

    // 其余的代理到网站服务
    const options = {
        host: 'localhost',
        port: config.localPort,
        path: req.url,
        method: req.method
    }

    http.request(options, response => {
        response.pipe(res)
        console.log(req.url)
    }).end()
}).listen(config.deployPort)

/**
 * github built 分支有提交时，重启网站服务
 */
handler.on('push', (event: any) => {
    if (event.payload.ref === 'refs/heads/built') {
        // 重新 clone
        execSync(`cp /app/node_modules /app-cache`)
        execSync(`rm -rf /app`)
        execSync(`git clone -b built --depth 1 https://github.com/ascoders/wokugame.git /app`)
        execSync(`mv /app-cache /app/node_modules`)
        execSync(`cd /app`)
        //execSync(`yarn`)
        execSync(`npm run pm2-restart`)
    }
})

/**
 * docker 关闭时，关闭网站服务
 */
process.on('SIGINT', () => {
    execSync(`npm run pm2-stop`)
})