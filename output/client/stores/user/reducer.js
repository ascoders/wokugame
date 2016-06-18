"use strict";
const action = require('./action');
const redux_immutablejs_1 = require('redux-immutablejs');
const Immutable = require('immutable');
const initialState = Immutable.Map({});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_immutablejs_1.createReducer(initialState, {
    [action.SIMPLE_GET_FUNCTION + '_SUCCESS']: (state, action) => {
        return state.merge({
            simpleGet: action.data
        });
    },
    [action.SIMPLE_POST_FUNCTION + '_SUCCESS']: (state, action) => {
        return state.merge({
            simplePost: action.data
        });
    }
});
