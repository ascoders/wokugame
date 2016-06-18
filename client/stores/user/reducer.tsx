import * as action from './action'
import {createReducer} from 'redux-immutablejs'
import * as Immutable from 'immutable'

const initialState:Immutable.Map<string, any> = Immutable.Map({
    
})

export default createReducer(initialState, {
    [action.SIMPLE_GET_FUNCTION + '_SUCCESS']: (state:Immutable.Map<string, any>, action:any) => {
        return state.merge({
            simpleGet: action.data
        })
    },
    [action.SIMPLE_POST_FUNCTION + '_SUCCESS']: (state:Immutable.Map<string, any>, action:any) => {
        return state.merge({
            simplePost: action.data
        })
    }
})