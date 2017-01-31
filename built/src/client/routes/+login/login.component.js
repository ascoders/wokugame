"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const React = require("react");
const typings = require("./login.type");
const mobx_react_1 = require("mobx-react");
const react_router_1 = require("react-router");
const button_1 = require("../../../../components/button");
const input_1 = require("../../../../components/input");
const register_style_1 = require("../+register/register.style");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mobx_react_1.inject('User', 'LoginPage')(mobx_react_1.observer((props = new typings.Props()) => {
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        const result = yield props.User.loginWithNicknamePassword(props.LoginPage.store.nickname, props.LoginPage.store.password);
        if (result) {
            react_router_1.browserHistory.goBack();
        }
    });
    const handleNicknameChange = (event) => {
        props.LoginPage.setNickname(event.currentTarget.value);
    };
    const handlePasswordChange = (event) => {
        props.LoginPage.setPassword(event.currentTarget.value);
    };
    return (React.createElement(register_style_1.Container, null,
        React.createElement(register_style_1.CenterContainer, null,
            React.createElement(input_1.default, { label: "昵称", value: props.LoginPage.store.nickname, onChange: handleNicknameChange }),
            React.createElement(register_style_1.PasswordContainer, null,
                React.createElement(input_1.default, { label: "密码", value: props.LoginPage.store.password, onChange: handlePasswordChange })),
            React.createElement(button_1.default, { onclick: handleSubmit }, "\u5B8C\u6210"))));
}));
//# sourceMappingURL=login.component.js.map