import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import routes from '../store/routes'
import createStore from '../store/create-store'

declare var window: any

// 开发环境
if (process.env['NODE_ENV'] !== 'production') {
    // window.perf 暴露性能监控工具
    const Perf = require('react-addons-perf')
    window.perf = Perf
}

const store = createStore({})
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('react-dom')
)