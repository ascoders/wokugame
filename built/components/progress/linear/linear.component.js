"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./linear.type");
const linear_style_1 = require("./linear.style");
class Linear extends React.Component {
    render() {
        return (React.createElement(linear_style_1.Container, { theme: { height: this.props.height } },
            React.createElement(linear_style_1.Progress, { theme: { value: this.props.progress, height: this.props.height }, style: { width: `${this.props.progress}%` } })));
    }
}
Linear.defaultProps = new typings.Props();
exports.default = Linear;
//# sourceMappingURL=linear.component.js.map