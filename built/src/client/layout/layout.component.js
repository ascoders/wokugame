"use strict";
const React = require("react");
const typings = require("./layout.type");
const index_1 = require("../../../frame/index");
const react_router_1 = require("react-router");
const menu_1 = require("../../../components/menu");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index_1.connect(state => {
    return {
        headerColor: state.application.headerColor
    };
})((props = new typings.Props()) => {
    console.log('layout render', props);
    return (React.createElement("div", null,
        React.createElement(menu_1.Menu, null,
            React.createElement(menu_1.MenuItem, null,
                React.createElement(react_router_1.Link, { to: "/" }, "\u6211\u9177")),
            React.createElement(menu_1.MenuItem, null,
                React.createElement(menu_1.MenuTree, { title: "游戏" },
                    React.createElement(react_router_1.Link, { to: "/game" }, "\u98DE\u673A\u5927\u6218"),
                    React.createElement(react_router_1.Link, { to: "/game" }, "\u6A21\u62DF\u661F\u7403")))),
        props.children));
});
//# sourceMappingURL=layout.component.js.map