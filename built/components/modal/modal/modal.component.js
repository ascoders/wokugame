"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const typings = require("./modal.type");
const modal_style_1 = require("./modal.style");
class InputComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.handleOutClick = () => {
            if (!this.props.backdropClickToClose)
                return;
            this.props.onClose();
        };
        this.handleModalClick = (event) => {
            event.stopPropagation();
        };
    }
    componentDidMount() {
        this.modalDom = document.createElement('div');
        document.body.appendChild(this.modalDom);
        this.renderModalDom();
    }
    componentDidUpdate() {
        this.renderModalDom();
    }
    componentWillUnmount() {
        document.body.removeChild(this.modalDom);
    }
    renderModalDom() {
        const ModalElement = (React.createElement(modal_style_1.Container, { onClick: this.handleOutClick.bind(this), tabIndex: -1, theme: { show: this.props.show } },
            React.createElement(modal_style_1.ModalContainer, { onClick: this.handleModalClick.bind(this) },
                React.createElement(modal_style_1.ModalContent, null,
                    this.props.title === null ? null :
                        React.createElement(modal_style_1.ModalHeader, null,
                            React.createElement(modal_style_1.ModalTitle, null, this.props.title),
                            React.createElement("button", { type: "button", className: "close" },
                                React.createElement(modal_style_1.CloseButton, { onClick: this.props.onClose }, "\u00D7"))),
                    React.createElement(modal_style_1.ModalBody, null, this.props.children)))));
        ReactDOM.render(ModalElement, this.modalDom);
    }
    render() {
        return null;
    }
}
InputComponent.defaultProps = new typings.Props();
exports.default = InputComponent;
//# sourceMappingURL=modal.component.js.map