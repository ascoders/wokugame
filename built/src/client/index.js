"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_router_1 = require("react-router");
require("isomorphic-fetch");
require("../../components/css-reset");
require("../../components/css-beautify");
const stores_1 = require("./stores");
const routes_1 = require("./routes");
const dynamic_react_1 = require("../../components/dynamic-react");
if (process.env.NODE_ENV !== 'production') {
    window.perf = require('react-addons-perf');
}
const req = require.context('./stores', true, /\.js$/);
const IProvider = (React.createElement(dynamic_react_1.Provider, { stores: new stores_1.Stores(), actions: new stores_1.Actions() },
    React.createElement(react_router_1.Router, { history: react_router_1.browserHistory }, routes_1.default)));
ReactDOM.render(IProvider, document.getElementById('react-dom'));
//# sourceMappingURL=index.js.map