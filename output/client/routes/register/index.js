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
let Register_1;
let Register = Register_1 = class Register extends routes_base_1.default {
    constructor(...args) {
        super(...args);
        this.state = new defintion.State();
    }
    getTitle() {
        return Register_1.title;
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement("div", {className: "client-routes-register"}, "注册"));
    }
};
Register.defaultProps = new defintion.Props();
Register.title = '注册 - 我酷游戏';
Register = Register_1 = __decorate([
    connect_1.default((state) => {
        return {
            userStore: state.user.toJS()
        };
    }, {})
], Register);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Register;
