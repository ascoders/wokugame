import * as React from 'react'
import * as ReactDOM from 'react-dom'
import routes from './routes'
import {useStrict} from 'mobx'
import {Provider} from 'mobx-react'
import {Router, browserHistory} from 'react-router'
import 'isomorphic-fetch'

import '../../components/css-reset'
import '../../components/css-beautify'

declare let window: any
declare let require: any

// 性能调试工具
if (process.env.NODE_ENV !== 'deploy') {
    // window.perf 暴露性能监控工具
    window.perf = require('react-addons-perf')
}

// mobx 严格模式
useStrict(true)

// // 捕获最上层错误
// window.addEventListener('unhandledrejection', (event: any) => {
//     console.log(1, event)
// })
// window.addEventListener('onrejectionhandled', (event: any) => {
//     console.log(2, event)
// })

// 读取所有 store
const req = require.context('./stores', true, /\.js$/)
let injects: any = {}
req.keys().forEach((key: string) => {
    const Store = req(key).default
    injects[Store.name] = new Store()
})

const IProvider = (
    <Provider {...injects}>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>
)

ReactDOM.render(IProvider, document.getElementById('react-dom'))