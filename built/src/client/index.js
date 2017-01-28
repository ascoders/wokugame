"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require("react");
const ReactDOM = require("react-dom");
const routes_1 = require("./routes");
const mobx_react_1 = require("mobx-react");
const react_router_1 = require("react-router");
require("isomorphic-fetch");
require("../../components/css-reset");
require("../../components/css-beautify");
if (process.env.NODE_ENV !== 'deploy') {
    window.perf = require('react-addons-perf');
}
const req = require.context('./stores', true, /\.js$/);
let injects = {};
req.keys().forEach((key) => {
    const Store = req(key).default;
    injects[Store.name] = new Store();
});
console.log(injects);
const IProvider = (React.createElement(mobx_react_1.Provider, __assign({}, injects),
    React.createElement(react_router_1.Router, { history: react_router_1.browserHistory }, routes_1.default)));
ReactDOM.render(IProvider, document.getElementById('react-dom'));
//# sourceMappingURL=index.js.map