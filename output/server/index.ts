/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings-replacement.d.ts" />

// import * as Koa from 'koa'
// import * as React from 'react'
// import routes from '../client/routes'
// import rootReducer from '../client/reducer'
// import {serverRenderValue} from 'fit-isomorphic-redux-tools'
// import * as fs from 'fs'
// import * as path from 'path'
//
// const app = new Koa()
//
// const htmlText = fs.readFileSync(path.join(__dirname, '../client/index.html'), 'utf-8')
//
// /**
//  * 后端渲染模板
//  */
// app.use(async(ctx) => {
//     const result: any = await serverRenderValue({
//         req: ctx.req,
//         routes,
//         basename: '',
//         rootReducer,
//         htmlText,
//         enableServerRender: true
//     })
//     ctx.body = result.result
//     ctx.type = 'html'
// })
// ///////////////
// app.listen(8080)