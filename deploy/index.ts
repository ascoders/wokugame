import * as http from 'http'
import * as createHandler from 'github-webhook-handler'
import * as httpProxy from 'http-proxy'
import {execSync} from 'child_process'
import * as config from '../config'

/**
 * 启动网站服务
 */
execSync(`npm run app-run`)

const handler = createHandler({path: '/webhook', secret: '123456'})
const proxy = httpProxy.createProxyServer({
    target: 'http://localhost:' + config.localPort
})

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
    } else {
        // 其余的代理到网站服务
        proxy.web(req, res)
    }
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
        execSync(`npm run app-restart`)
    }
})

/**
 * docker 关闭时，关闭网站服务
 */
process.on('SIGINT', () => {
    execSync(`npm run app-stop`)
})