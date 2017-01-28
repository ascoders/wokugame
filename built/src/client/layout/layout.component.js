"use strict";
const React = require("react");
const typings = require("./layout.type");
const react_router_1 = require("react-router");
const menu_1 = require("../../../components/menu");
const layout_style_1 = require("./layout.style");
let MobxReactDevtools;
if (process.env.NODE_ENV !== 'production') {
    MobxReactDevtools = require('mobx-react-devtools').default;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (props = new typings.Props()) => {
    return (React.createElement(layout_style_1.Container, null,
        React.createElement(menu_1.Menu, null,
            React.createElement(menu_1.MenuItem, null,
                React.createElement(react_router_1.Link, { to: "/" }, "\u6211\u9177")),
            React.createElement(menu_1.MenuItem, null,
                React.createElement(menu_1.MenuTree, { title: "游戏" },
                    React.createElement(menu_1.MenuItem, null,
                        React.createElement(react_router_1.Link, { to: "/game" }, "\u98DE\u673A\u5927\u6218")),
                    React.createElement(menu_1.MenuItem, null,
                        React.createElement(react_router_1.Link, { to: "/game" }, "\u6A21\u62DF\u661F\u7403")))),
            React.createElement(menu_1.MenuItem, null,
                React.createElement(react_router_1.Link, { to: "/login" }, "\u767B\u5F55")),
            React.createElement(menu_1.MenuItem, null,
                React.createElement(react_router_1.Link, { to: "/register" }, "\u6CE8\u518C"))),
        props.children,
        process.env.NODE_ENV !== 'production' &&
            React.createElement(MobxReactDevtools, { position: { left: 0, bottom: 0 } })));
};
//# sourceMappingURL=layout.component.js.map