"use strict";
const React = require("react");
const typings = require("./register.type");
const index_1 = require("../../../../frame/index");
const styles = require('./register.css');
const button_1 = require("../../../../components/button");
const input_1 = require("../../../../components/input");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index_1.connect(state => {
    return {
        nickname: state.pageRegister.nickname,
        password: state.pageRegister.password
    };
})((props = new typings.Props()) => {
    const handleSubmit = () => {
        props.dispatch({
            type: 'user/create',
            payload: {
                nickname: props.nickname,
                password: props.password
            }
        });
    };
    const handleNicknameChange = (event) => {
        props.dispatch({
            type: 'pageRegister/updateNickname',
            payload: event.currentTarget.value
        });
    };
    const handlePasswordChange = (event) => {
        props.dispatch({
            type: 'pageRegister/updatePassword',
            payload: event.currentTarget.value
        });
    };
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.centerContainer },
            React.createElement(input_1.default, { label: "昵称", value: props.nickname, onChange: handleNicknameChange }),
            React.createElement(input_1.default, { label: "密码", value: props.password, onChange: handlePasswordChange, style: { marginTop: -2 } }),
            React.createElement(button_1.default, { onclick: handleSubmit }, "\u5B8C\u6210"))));
});
//# sourceMappingURL=register.component.js.map