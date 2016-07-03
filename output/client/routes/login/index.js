"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const routes_base_1 = require('../../components/routes-base');
const connect_1 = require('fit-isomorphic-redux-tools/lib/connect');
const defintion = require('./defintion');
let Login_1;
let Login = Login_1 = class Login extends routes_base_1.default {
    constructor(...args) {
        super(...args);
        this.state = new defintion.State();
    }
    getTitle() {
        return Login_1.title;
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement("div", {className: "client-routes-login"}, "登录"));
    }
};
Login.defaultProps = new defintion.Props();
Login.title = '登录 - 我酷游戏';
Login = Login_1 = __decorate([
    connect_1.default((state) => {
        return {
            userStore: state.user.toJS()
        };
    }, {})
], Login);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
