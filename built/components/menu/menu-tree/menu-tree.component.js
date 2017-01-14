"use strict";
const React = require("react");
const typings = require("./menu-tree.type");
const styles = require('./menu-tree.css');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (props = new typings.Props()) => {
    return (React.createElement("div", { className: styles.container, name: "woku-menu-item" },
        typeof props.title === 'string'
            ? props.title
            : props.title(),
        React.createElement("div", { className: styles.treeItem, name: "woku-menu-subtree" }, props.children)));
};
//# sourceMappingURL=menu-tree.component.js.map