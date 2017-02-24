"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./tabs.type");
const tabs_style_1 = require("./tabs.style");
class TabsComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.handlePaneTitleClick = (index) => {
            this.setState({
                index
            });
        };
        this.renderPaneTitle = (props, index) => {
            return (React.createElement(tabs_style_1.TabTitle, { theme: { active: this.state.index === index }, onClick: this.handlePaneTitleClick.bind(this, index) }, typeof props.title === 'string' ? props.title : props.title()));
        };
    }
    renderCurrentPaneContent() {
        return React.Children.toArray(this.props.children)[this.state.index];
    }
    render() {
        const PaneTitles = React.Children.map(this.props.children, (children, index) => {
            if (!children) {
                return null;
            }
            return this.renderPaneTitle(children.props, index);
        });
        return (React.createElement(tabs_style_1.Container, null,
            React.createElement(tabs_style_1.TitleContainer, null, PaneTitles),
            React.createElement(tabs_style_1.PaneContainer, null, this.renderCurrentPaneContent())));
    }
}
TabsComponent.defaultProps = new typings.Props();
exports.default = TabsComponent;
//# sourceMappingURL=tabs.component.js.map