"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./layout.type");
const react_router_1 = require("react-router");
const dynamic_react_1 = require("../../../components/dynamic-react");
const menu_1 = require("../../../components/menu");
const layout_style_1 = require("./layout.style");
let LayoutScene = class LayoutScene extends React.Component {
    constructor() {
        super(...arguments);
        this.handleLogout = () => {
            this.props.actions.UserAction.loginOut();
        };
    }
    componentWillMount() {
        this.props.actions.UserAction.loginAuthenticatedUser();
    }
    render() {
        return (React.createElement(layout_style_1.Container, null,
            React.createElement(menu_1.Menu, null,
                React.createElement(menu_1.MenuItem, null,
                    React.createElement(react_router_1.Link, { to: "/" }, "\u6211\u9177")),
                React.createElement(menu_1.MenuItem, null,
                    React.createElement(menu_1.MenuTree, { title: "游戏" },
                        React.createElement(menu_1.MenuItem, null,
                            React.createElement(react_router_1.Link, { to: "/game/play-aircraft" }, "\u98DE\u673A\u5927\u6218")),
                        React.createElement(menu_1.MenuItem, null,
                            React.createElement(react_router_1.Link, { to: "/game/simulated-planet" }, "\u6A21\u62DF\u661F\u7403")))),
                !this.props.user
                    ? [
                        React.createElement(menu_1.MenuItem, { key: "0" },
                            React.createElement(react_router_1.Link, { to: "/login" }, "\u767B\u5F55")),
                        React.createElement(menu_1.MenuItem, { key: "1" },
                            React.createElement(react_router_1.Link, { to: "/register" }, "\u6CE8\u518C"))
                    ]
                    : React.createElement(menu_1.MenuItem, null,
                        React.createElement(menu_1.MenuTree, { title: this.props.user.nickname },
                            React.createElement(menu_1.MenuItem, { onClick: this.handleLogout },
                                React.createElement(menu_1.MenuText, null, "\u9000\u51FA"))))),
            this.props.children));
    }
};
LayoutScene.defaultProps = new typings.Props();
LayoutScene = __decorate([
    dynamic_react_1.Connect(state => {
        return {
            user: state.UserStore.authenticatedUser
        };
    })
], LayoutScene);
exports.default = LayoutScene;
//# sourceMappingURL=layout.component.js.map