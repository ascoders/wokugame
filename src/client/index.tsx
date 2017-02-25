import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import 'isomorphic-fetch'

import '../../components/css-reset'
import '../../components/css-beautify'

import StoreProps from './stores'

import routes from './routes'
import { Provider, Connect } from '../../components/dynamic-react'

declare let window: any
declare let require: any

// 开发环境
if (process.env.NODE_ENV !== 'production') {
    // window.perf 暴露性能监控工具
    window.perf = require('react-addons-perf')
}

// // 捕获最上层错误
// window.addEventListener('unhandledrejection', (event: any) => {
//     console.log(event)
// })
// window.addEventListener('onrejectionhandled', (event: any) => {
//     console.log(event)
// })

// serviceWorker 开启缓存&加速
// declare let navigator: any
// navigator.serviceWorker.register('/static/service-worker.js', {scope: '/static/'}).then((registration: any) => {
//     console.log('ServiceWorker registration successful with scope: ', registration.scope)
// }).catch((err: any) => {
//     console.log('ServiceWorker registration failed: ', err)
// })

const req = require.context('./stores', true, /\.js$/)

const IProvider = (
    <Provider {...new StoreProps() }>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>
)

ReactDOM.render(IProvider, document.getElementById('react-dom'))