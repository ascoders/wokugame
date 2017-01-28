"use strict";
const React = require("react");
const typings = require("./login.type");
const mobx_react_1 = require("mobx-react");
const button_1 = require("../../../../components/button");
const input_1 = require("../../../../components/input");
const register_style_1 = require("../+register/register.style");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mobx_react_1.inject('User', 'LoginPage')(mobx_react_1.observer((props = new typings.Props()) => {
    const handleSubmit = () => {
        props.User.loginWithNicknamePassword(props.LoginPage.store.nickname, props.LoginPage.store.password);
    };
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