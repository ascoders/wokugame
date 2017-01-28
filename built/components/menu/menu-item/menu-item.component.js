"use strict";
const React = require("react");
const typings = require("./menu-item.type");
const mobx_react_1 = require("mobx-react");
const menu_item_style_1 = require("./menu-item.style");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mobx_react_1.inject('menu')(mobx_react_1.observer((props = new typings.Props()) => {
    return (React.createElement(menu_item_style_1.Container, { name: "woku-menu-item", theme: { height: props.menu.store.height } }, props.children));
}));
//# sourceMappingURL=menu-item.component.js.map