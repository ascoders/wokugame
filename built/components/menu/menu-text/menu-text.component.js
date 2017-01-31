"use strict";
const React = require("react");
const typings = require("./menu-text.type");
const mobx_react_1 = require("mobx-react");
const menu_text_style_1 = require("./menu-text.style");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mobx_react_1.inject('Menu')(mobx_react_1.observer((props = new typings.Props()) => {
    return (React.createElement(menu_text_style_1.Container, { name: "woku-menu-item", theme: { height: props.Menu.store.height } }, props.children));
}));
//# sourceMappingURL=menu-text.component.js.map