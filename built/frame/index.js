"use strict";
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const react_router_redux_1 = require("react-router-redux");
const create_store_1 = require("./create-store");
const redux_1 = require("redux");
const react_router_redux_2 = require("react-router-redux");
const Immutable = require("seamless-immutable");
const invariant = require("invariant");
if (process.env.NODE_ENV !== 'production') {
    window.perf = require('react-addons-perf');
}
class App {
    constructor() {
        this.routes = null;
        this.hasRendered = false;
        this.models = [];
    }
    use() {
    }
    router(routes) {
        this.routes = routes;
    }
    model(model) {
        this.models.push(model);
    }
    render() {
        invariant(!this.hasRendered, 'app.render: render can only call once');
        invariant(this.routes !== null, 'app.render: router should be defined');
        this.hasRendered = true;
        let rootReducerCombineObject = {
            routing: react_router_redux_2.routerReducer
        };
        this.models.forEach(model => {
            const defaultState = Immutable.from(model.defaultState);
            rootReducerCombineObject[model.namespace] = (state = defaultState, action) => {
                if (action.type.startsWith(model.namespace + '/')) {
                    const methodName = action.type.replace(model.namespace + '/', '');
                    if (model.reducers[methodName]) {
                        return model.reducers[methodName](state, action);
                    }
                }
                return state;
            };
        });
        const store = create_store_1.default({}, redux_1.combineReducers(rootReducerCombineObject));
        const history = react_router_redux_1.syncHistoryWithStore(react_router_1.browserHistory, store);
        return (React.createElement(react_redux_1.Provider, { store: store },
            React.createElement(react_router_1.Router, { history: history }, this.routes)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
exports.connect = react_redux_1.connect;
//# sourceMappingURL=index.js.map