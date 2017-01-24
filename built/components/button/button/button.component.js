"use strict";
const React = require("react");
const typings = require("./button.type");
const styles = require('./button.css');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (props = new typings.Props()) => {
    return (React.createElement("div", { onClick: props.onclick, className: styles.container }, props.children));
};
//# sourceMappingURL=button.component.js.map