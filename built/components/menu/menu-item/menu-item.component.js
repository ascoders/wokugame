"use strict";
const React = require("react");
const typings = require("./menu-item.type");
const react_redux_1 = require("react-redux");
const styles = require('./menu-item.css');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(state => {
    return {
        height: state.height
    };
})((props = new typings.Props()) => {
    return (React.createElement("div", { className: styles.container, name: "woku-menu-item", style: { height: props.height } }, props.children));
});
//# sourceMappingURL=menu-item.component.js.map