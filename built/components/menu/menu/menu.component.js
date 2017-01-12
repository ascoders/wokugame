"use strict";
const React = require("react");
const typings = require("./menu.type");
const styles = require('./menu.css');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (props = new typings.Props()) => {
    return (React.createElement("div", { className: styles.container }, props.children));
};
//# sourceMappingURL=menu.component.js.map