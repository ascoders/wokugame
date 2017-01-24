"use strict";
const React = require("react");
const typings = require("./input.type");
const styles = require('./input.css');
class Input extends React.Component {
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
        const containerStyle = Object.assign({}, {
            zIndex: this.state.focus ? 1 : 0
        }, this.props.style);
        return (React.createElement("label", { className: styles.container, style: containerStyle },
            this.props.label !== null &&
                React.createElement("span", { className: styles.label }, this.props.label),
            React.createElement("div", { className: styles.inputContainer },
                React.createElement("input", { className: styles.inputField, value: this.props.value, defaultValue: this.props.defaultValue, onFocus: this.handleFocus, onBlur: this.handleBlur, onChange: this.props.onChange }),
                React.createElement("span", { className: styles.shadow }))));
    }
}
Input.defaultProps = new typings.Props();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Input;
//# sourceMappingURL=input.component.js.map