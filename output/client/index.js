"use strict";
const ReactDOM = require('react-dom');
const fit_isomorphic_redux_tools_1 = require('fit-isomorphic-redux-tools');
const routes_1 = require('./routes');
const reducer_1 = require('./reducer');
const routerElement = fit_isomorphic_redux_tools_1.router(routes_1.default, '', reducer_1.default);
ReactDOM.render(routerElement, document.getElementById('react-dom'));
