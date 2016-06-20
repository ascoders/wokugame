"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const fit_isomorphic_redux_tools_1 = require('fit-isomorphic-redux-tools');
const defintion = require('./defintion');
const react_router_1 = require('react-router');
let Home = class Home extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new defintion.State();
    }
    componentWillMount() {
    }
    componentDidMount() {
        document.title = '我酷游戏';
    }
    render() {
        return (React.createElement("div", {className: "client-routes-home"}, React.createElement(react_router_1.Link, {to: "/login"}, "登录"), React.createElement(react_router_1.Link, {to: "/register"}, "注册")));
    }
};
Home.defaultProps = new defintion.Props();
Home = __decorate([
    fit_isomorphic_redux_tools_1.connect((state) => {
        return {
            userStore: state.user.toJS()
        };
    }, {})
], Home);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
