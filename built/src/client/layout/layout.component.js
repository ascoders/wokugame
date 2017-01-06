"use strict";
const React = require("react");
const typings = require("./layout.type");
const index_1 = require("../../../frame/index");
const menu_component_1 = require("../../../components/menu/menu.component");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index_1.connect(state => {
    return {
        headerColor: state.application.headerColor
    };
})((props = new typings.Props()) => {
    return (React.createElement("div", null,
        React.createElement(menu_component_1.default, null),
        props.children));
});
//# sourceMappingURL=layout.component.js.map