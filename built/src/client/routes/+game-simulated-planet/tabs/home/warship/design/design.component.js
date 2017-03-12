"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./design.type");
const dynamic_react_1 = require("../../../../../../../../components/dynamic-react");
const modal_1 = require("../../../../../../../../components/modal");
const detail_component_1 = require("./detail/detail.component");
const design_style_1 = require("./design.style");
let Design = class Design extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.handleClose = () => {
            this.setState({ show: false });
        };
        this.handleShow = () => {
            this.setState({ show: true });
        };
    }
    render() {
        return (React.createElement(design_style_1.Container, { onClick: this.handleShow },
            React.createElement(modal_1.default, { show: this.state.show, onClose: this.handleClose, title: `设计 ${this.props.warship.name}` }, this.state.show &&
                React.createElement(detail_component_1.default, { warship: this.props.warship, onClose: this.handleClose })),
            "\u8BBE\u8BA1"));
    }
};
Design.defaultProps = new typings.Props();
Design = __decorate([
    dynamic_react_1.Connect
], Design);
exports.default = Design;
//# sourceMappingURL=design.component.js.map