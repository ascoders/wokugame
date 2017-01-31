"use strict";
const React = require("react");
const typings = require("./game-simulated-planet.type");
const mobx_react_1 = require("mobx-react");
const game_simulated_planet_style_1 = require("./game-simulated-planet.style");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mobx_react_1.inject('User')(mobx_react_1.observer((props = new typings.Props()) => {
    return (React.createElement(game_simulated_planet_style_1.GridContainer, null,
        React.createElement(game_simulated_planet_style_1.Header, null),
        React.createElement(game_simulated_planet_style_1.Sidebar, null, "\u5BB6\u56ED"),
        React.createElement(game_simulated_planet_style_1.Main, null, "\u603B\u4EBA\u53E3 20"),
        React.createElement(game_simulated_planet_style_1.Footer, null)));
}));
//# sourceMappingURL=game-simulated-planet.component.js.map