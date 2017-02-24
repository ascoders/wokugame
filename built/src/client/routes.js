"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_1 = require("react-router");
const layout_component_1 = require("./layout/layout.component");
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
        callback(null, require('./routes/+game-play-aircraft/game-play-aircraft.component').default);
    });
};
const getGameSimulatedPlanet = (nextState, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./routes/+game-simulated-planet/game-simulated-planet.component').default);
    });
};
const getLogin = (nextState, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./routes/+login/login.component').default);
    });
};
const getRegister = (nextState, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./routes/+register/register.component').default);
    });
};
exports.default = (React.createElement(react_router_1.Route, { path: "/", component: layout_component_1.default },
    React.createElement(react_router_1.IndexRoute, { getComponent: getHome }),
    React.createElement(react_router_1.Route, { path: "login", getComponent: getLogin }),
    React.createElement(react_router_1.Route, { path: "register", getComponent: getRegister }),
    React.createElement(react_router_1.Route, { path: "/game" },
        React.createElement(react_router_1.Route, { path: "play-aircraft", getComponent: getGame }),
        React.createElement(react_router_1.Route, { path: "simulated-planet", getComponent: getGameSimulatedPlanet }))));
//# sourceMappingURL=routes.js.map