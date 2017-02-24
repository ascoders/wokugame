"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./tab-pane.type");
const tab_pane_style_1 = require("./tab-pane.style");
class TabPaneComponent extends React.Component {
    render() {
        return (React.createElement(tab_pane_style_1.Container, null, this.props.children));
    }
}
TabPaneComponent.defaultProps = new typings.Props();
exports.default = TabPaneComponent;
//# sourceMappingURL=tab-pane.component.js.map