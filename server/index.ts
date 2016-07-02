/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings-replacement.d.ts" />

import * as Koa from 'koa'
import * as React from 'react'
import routes from '../client/routes'
import rootReducer from '../client/reducer'
import serverRenderValue from 'fit-isomorphic-redux-tools/lib/server-render-value'
import services from 'fit-isomorphic-redux-tools/lib/service'
import * as fs from 'fs'
import * as path from 'path'
import requireFolderIndex from './utils/require-folder-index'
import * as _ from 'lodash'
import * as Router from 'koa-router'
import * as session from 'koa-session'
import * as bodyParser from 'koa-bodyparser'
import staticMiddleware from './middleware/static'
import * as covert from 'koa-convert'

const app = new Koa()

/**
 * 注册 middleware
 */
app.use(covert(staticMiddleware()))
app.use(covert(session(app)))
app.use(covert(bodyParser()))


/**
 * 动态子文件夹注册路由
 */
requireFolderIndex(path.join(__dirname, 'modules'))

const router = new Router()
for (var key of services.keys()) {
    const service = services.get(key)
    const callback = async(ctx: Koa.Context)=> {
        let params: any = _.assign(ctx.body || {}, ctx.query || {})
        ctx.body = await service.value(params, ctx)
    }
    switch (service.method) {
        case 'get':
            router.get(key, callback)
            break
        case 'post':
            router.post(key, callback)
            break
    }
}
app.use(router.routes())

/**
 * 获取模板 HTML 内容
 */
const htmlText = fs.readFileSync(path.join(__dirname, '../client/index.html'), 'utf-8')

/**
 * 后端渲染模板
 * 注册最后一个路由
 */
app.use(async(ctx) => {
    const result: any = await serverRenderValue({
        req: ctx.req,
        routes,
        basename: '',
        rootReducer,
        htmlText,
        enableServerRender: true
    })
    ctx.body = result.result
    ctx.type = 'html'
})

app.listen(8080)