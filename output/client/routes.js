"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const layout_1 = require('./routes/layout');
if (typeof (require.ensure) !== 'function') {
    require.ensure = function (modules, callback) {
        callback(require);
    };
}
const getHome = (nextState, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./routes/home').default);
    });
};
const getLogin = (nextState, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./routes/login').default);
    });
};
const getRegister = (nextState, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./routes/register').default);
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (React.createElement(react_router_1.Route, {path: "/", component: layout_1.default}, React.createElement(react_router_1.IndexRoute, {getComponent: getHome}), React.createElement(react_router_1.Route, {path: "login", getComponent: getLogin}), React.createElement(react_router_1.Route, {path: "register", getComponent: getRegister})));
