import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import applicationReducer from './application'

const rootReducer = combineReducers({
    routing: routerReducer,
    application: applicationReducer
})

export default rootReducer