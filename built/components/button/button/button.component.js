"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./button.type");
const button_style_1 = require("./button.style");
exports.default = (props = new typings.Props()) => {
    return (React.createElement(button_style_1.Container, { onClick: props.onclick }, props.children));
};
//# sourceMappingURL=button.component.js.map