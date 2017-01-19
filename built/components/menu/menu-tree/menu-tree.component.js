"use strict";
const React = require("react");
const typings = require("./menu-tree.type");
const react_redux_1 = require("react-redux");
const styles = require('./menu-tree.css');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(state => {
    return {
        height: state.height
    };
})((props = new typings.Props()) => {
    return (React.createElement("div", { className: styles.container, name: "woku-menu-item", style: { height: props.height } },
        typeof props.title === 'string'
            ? props.title
            : props.title(),
        React.createElement("div", { className: styles.treeItem, name: "woku-menu-subtree", style: { top: props.height } }, props.children)));
});
//# sourceMappingURL=menu-tree.component.js.map