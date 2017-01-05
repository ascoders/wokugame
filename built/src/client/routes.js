"use strict";
const React = require("react");
const react_router_1 = require("react-router");
const layout_component_1 = require("./layout/layout.component");
const home_component_1 = require("./routes/+home/home.component");
const game_component_1 = require("./routes/+game/game.component");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (React.createElement(react_router_1.Route, { path: "/", component: layout_component_1.default },
    React.createElement(react_router_1.IndexRoute, { component: home_component_1.default }),
    React.createElement(react_router_1.Route, { path: "game", component: game_component_1.default })));
//# sourceMappingURL=routes.js.map