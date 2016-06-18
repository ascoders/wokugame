"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const index_1 = require('./routes/layout/index');
const index_2 = require('./routes/home/index');
const index_3 = require('./routes/page-a/index');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (React.createElement(react_router_1.Route, {path: "/", component: index_1.default}, React.createElement(react_router_1.IndexRoute, {component: index_2.default}), React.createElement(react_router_1.Route, {path: "page-a", component: index_3.default})));
