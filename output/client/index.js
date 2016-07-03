"use strict";
const ReactDOM = require('react-dom');
const router_1 = require('fit-isomorphic-redux-tools/lib/router');
const routes_1 = require('./routes');
const reducer_1 = require('./reducer');
require('./index.scss');
const routerElement = router_1.default(routes_1.default, '', reducer_1.default);
ReactDOM.render(routerElement, document.getElementById('react-dom'));
