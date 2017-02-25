"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./menu-text.type");
const dynamic_react_1 = require("../../dynamic-react");
const menu_text_style_1 = require("./menu-text.style");
exports.default = dynamic_react_1.Connect((props = new typings.Props()) => {
    return (React.createElement(menu_text_style_1.Container, { name: "woku-menu-item", theme: { height: props.menuStore.height } }, props.children));
});
//# sourceMappingURL=menu-text.component.js.map