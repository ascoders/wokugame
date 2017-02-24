"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./menu-tree.type");
const dynamic_react_1 = require("../../dynamic-react");
const menu_tree_style_1 = require("./menu-tree.style");
exports.default = dynamic_react_1.Connect(state => {
    return {
        height: state.store.height
    };
})((props = new typings.Props()) => {
    return (React.createElement(menu_tree_style_1.Container, { theme: { height: props.height }, name: "woku-menu-tree" },
        typeof props.title === 'string'
            ? props.title
            : props.title(),
        React.createElement(menu_tree_style_1.TreeItem, { name: "woku-menu-subtree", theme: { top: props.height } }, props.children)));
});
//# sourceMappingURL=menu-tree.component.js.map