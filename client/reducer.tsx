import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import layout from './stores/user/reducer'

// 聚合各 reducer
// 将路由也加入 reducer
const rootReducer = combineReducers({
    routing: routerReducer,
    user: layout
})

export default rootReducer