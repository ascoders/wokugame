"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const react_router_1 = require('react-router');
const fit_isomorphic_redux_tools_1 = require('fit-isomorphic-redux-tools');
let Home = class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
    }
    componentDidMount() {
        document.title = 'React & nodejs';
    }
    render() {
        const { userStore } = this.props;
        return (React.createElement("div", {className: "client-routes-home"}, React.createElement("div", {className: "title"}, "React run well V15.0.1"), React.createElement("p", null, "访问 chrome 商店,", React.createElement("a", {target: "_blank", href: "https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-ntp-icon"}, "下载 Redux DevTools 插件"), ",随时查看页面状态树"), React.createElement("p", null, React.createElement(react_router_1.Link, {to: "/page-a"}, "html5路由一"), React.createElement(react_router_1.Link, {to: "/page-b", style: { marginLeft: 10 }}, "html5路由二"))));
    }
};
Home = __decorate([
    fit_isomorphic_redux_tools_1.connect((state) => {
        return {
            userStore: state.user.toJS()
        };
    }, {})
], Home);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
