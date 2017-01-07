"use strict";
const redux_1 = require("redux");
const react_router_1 = require("react-router");
const react_router_redux_1 = require("react-router-redux");
function configureStore(initialState, rootReducer) {
    const store = redux_1.createStore(rootReducer, initialState, redux_1.compose(redux_1.applyMiddleware(..._getMiddleware()), typeof __DEV__ && environment.devToolsExtension ?
        environment.devToolsExtension() :
        (f) => f));
    _enableHotLoader(store);
    return store;
}
function _getMiddleware() {
    let middleware = [
        react_router_redux_1.routerMiddleware(react_router_1.browserHistory)
    ];
    if (typeof __DEV__) {
        middleware = [...middleware];
    }
    return middleware;
}
const environment = window || this;
function _enableHotLoader(store) {
    if (!typeof __DEV__) {
        return;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureStore;
//# sourceMappingURL=create-store.js.map