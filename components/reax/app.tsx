import * as React from 'react'
import {Provider, connect as reduxConnect} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import createStore from './create-store'
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import * as invariant from 'invariant'
import {Imodel, Iaction} from './model'

declare const window: any

// 开发环境
if (process.env.NODE_ENV !== 'production') {
    // window.perf 暴露性能监控工具
    window.perf = require('react-addons-perf')
}

export default class App {
    // 路由设置
    private routes: React.ReactElement<any> = null

    // 是否已经 render 了，同一个实例不能 render 多次
    private hasRendered = false

    // 模型
    private models: Array<Imodel<any>> = []

    constructor() {

    }

    // 加载插件
    public use() {
    }

    // 加载路由
    // 依赖 react-router
    public router(routes: React.ReactElement<any>) {
        this.routes = routes
    }

    // 加载数据层
    public model(model: Imodel<any>) {
        this.models.push(model)
    }

    // 渲染
    // 每个实例仅应最后调用一次
    public render() {
        invariant(!this.hasRendered, 'app.render: render can only call once')
        invariant(this.routes !== null, 'app.render: router should be defined')

        this.hasRendered = true

        // 创建 rootReducer
        let rootReducerCombineObject: {
            [x: string]: any
        } = {
            routing: routerReducer
        }

        this.models.forEach(model => {
            const defaultState = model.state

            // 这个对象是冻结的
            if (process.env.NODE_ENV !== 'production') {
                Object.freeze(defaultState)
            }

            rootReducerCombineObject[model.namespace] = (state = defaultState, action: Iaction<any>) => {
                // 只接收对应前缀的
                if (action.type.startsWith(model.namespace + '/')) {
                    const methodName = action.type.replace(model.namespace + '/', '')
                    if (model.reducers[methodName]) {
                        return model.reducers[methodName](state, action)
                    }
                }
                return state
            }
        })

        // 生成 store
        const store = createStore({}, combineReducers(rootReducerCombineObject))

        // 生成 history
        const history = syncHistoryWithStore(browserHistory, store)

        return (
            <Provider store={store}>
                <Router history={history}>
                    {this.routes}
                </Router>
            </Provider>
        )
    }
}

export const connect = reduxConnect