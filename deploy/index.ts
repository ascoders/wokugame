import * as http from 'http'
import * as createHandler from 'github-webhook-handler'
import {execSync} from 'child_process'
import * as config from '../config'
const handler = createHandler({path: '/webhook', secret: '123456'})

// 启动 pm2
execSync(`npm run pm2-start`)

http.createServer((req, res) => {
    handler(req, res, (err: any) => {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(config.deployPort)

handler.on('push', (event: any) => {
    // 如果提交到了 built 分支，重启服务
    if (event.payload.ref === 'refs/heads/built') {
        // 重新 clone
        execSync(`rm -rf /app`)
        execSync(`git clone -b built --depth 1 https://github.com/ascoders/wokugame.git /app`)
        execSync(`cd /app`)
        execSync(`yarn`)
        execSync(`npm run pm2-restart`)
    }
})

// docker shutdown
process.on('SIGINT', () => {

})