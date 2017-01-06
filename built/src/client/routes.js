"use strict";
const React = require("react");
const react_router_1 = require("react-router");
if (typeof (require.ensure) !== 'function') {
    require.ensure = (modules, callback) => {
        callback(require);
    };
}
const getHome = (nextState, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./routes/+home/home.component').default);
    });
};
const getGame = (nextState, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./routes/+game/game.component').default);
    });
};
const layout_component_1 = require("./layout/layout.component");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (React.createElement(react_router_1.Route, { path: "/", component: layout_component_1.default },
    React.createElement(react_router_1.IndexRoute, { getComponent: getHome }),
    React.createElement(react_router_1.Route, { path: "game", getComponent: getGame })));
//# sourceMappingURL=routes.js.map