"use strict";
const React = require("react");
const typings = require("./menu-item.type");
const styles = require('./menu-item.css');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (props = new typings.Props()) => {
    return (React.createElement("div", { className: styles.container, name: 'woku-menu-item' }, props.children));
};
//# sourceMappingURL=menu-item.component.js.map