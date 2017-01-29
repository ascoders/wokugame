"use strict";
const React = require("react");
const typings = require("./menu-tree.type");
const mobx_react_1 = require("mobx-react");
const menu_tree_style_1 = require("./menu-tree.style");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mobx_react_1.inject('Menu')(mobx_react_1.observer((props = new typings.Props()) => {
    return (React.createElement(menu_tree_style_1.Container, { theme: { height: props.Menu.store.height }, name: "woku-menu-tree" },
        typeof props.title === 'string'
            ? props.title
            : props.title(),
        React.createElement(menu_tree_style_1.TreeItem, { name: "woku-menu-subtree", theme: { top: props.Menu.store.height } }, props.children)));
}));
//# sourceMappingURL=menu-tree.component.js.map