"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./menu-item.type");
const dynamic_react_1 = require("../../dynamic-react");
const menu_item_style_1 = require("./menu-item.style");
exports.default = dynamic_react_1.Connect(state => {
    return {
        height: state.store.height
    };
})((props = new typings.Props()) => {
    return (React.createElement(menu_item_style_1.Container, { onClick: props.onClick, name: "woku-menu-item", theme: { height: props.height } }, props.children));
});
//# sourceMappingURL=menu-item.component.js.map