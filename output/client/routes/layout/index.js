"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const connect_1 = require('fit-isomorphic-redux-tools/lib/connect');
const userActions = require('../../stores/user/action');
const defintion = require('./defintion');
let LayoutComponent = class LayoutComponent extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new defintion.State();
    }
    render() {
        return this.props.children;
    }
};
LayoutComponent.defaultProps = new defintion.Props();
LayoutComponent = __decorate([
    connect_1.default((state) => {
        return {
            userStore: state.user.toJS()
        };
    }, userActions)
], LayoutComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LayoutComponent;
