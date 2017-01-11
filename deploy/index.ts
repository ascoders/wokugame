import * as http from 'http'
import * as createHandler from 'github-webhook-handler'
import * as httpProxy from 'http-proxy'
import {execSync} from 'child_process'
import * as config from '../config'

/**
 * 设置 github web hook
 */
const handler = createHandler({path: '/webhook', secret: '123456'})

/**
 * 启动网站服务
 */
try {
    execSync(`npm run app-run`)
} catch (err) {

}

/**
 * 设置网站应用代理
 */
const proxy = httpProxy.createProxyServer({
    target: 'http://localhost:' + config.localPort
})

proxy.on('error', () => {
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
        // pull
        execSync(`cd /app; git pull origin built`)
        execSync(`npm run app-reload`)
    }
})

/**
 * github webhook 异常处理
 * 不处理的话，默认会抛出异常然后挂掉 app，太恐怖了
 */
handler.on('error', () => {

})

/**
 * docker 关闭时，关闭网站服务
 */
process.on('SIGINT', () => {
    execSync(`npm run app-stop`)
})