"use strict";
const redux_1 = require('redux');
const react_router_redux_1 = require('react-router-redux');
const reducer_1 = require('./stores/user/reducer');
const rootReducer = redux_1.combineReducers({
    routing: react_router_redux_1.routerReducer,
    user: reducer_1.default
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rootReducer;
