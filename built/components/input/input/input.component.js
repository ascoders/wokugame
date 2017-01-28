"use strict";
const React = require("react");
const typings = require("./input.type");
const input_style_1 = require("./input.style");
class InputComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.handleFocus = () => {
            this.setState({
                focus: true
            });
        };
        this.handleBlur = () => {
            this.setState({
                focus: false
            });
        };
    }
    render() {
        return (React.createElement(input_style_1.LabelContainer, { theme: { focus: this.state.focus } },
            this.props.label !== null &&
                React.createElement(input_style_1.Label, null, this.props.label),
            React.createElement(input_style_1.InputContainer, null,
                React.createElement(input_style_1.Input, { value: this.props.value, defaultValue: this.props.defaultValue, onFocus: this.handleFocus, onBlur: this.handleBlur, onChange: this.props.onChange }),
                React.createElement(input_style_1.Shadow, { name: "woku-input-shadow" }))));
    }
}
InputComponent.defaultProps = new typings.Props();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InputComponent;
//# sourceMappingURL=input.component.js.map