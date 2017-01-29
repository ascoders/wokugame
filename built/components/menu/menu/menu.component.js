"use strict";
const React = require("react");
const typings = require("./menu.type");
const mobx_react_1 = require("mobx-react");
const index_1 = require("../stores/index");
const menu_style_1 = require("./menu.style");
class MenuComponent extends React.Component {
    componentWillMount() {
        this.Menu = new index_1.default();
        if (this.props.height) {
            this.Menu.setHeight(this.props.height);
        }
    }
    render() {
        return (React.createElement(mobx_react_1.Provider, { Menu: this.Menu },
            React.createElement(menu_style_1.Container, { theme: { height: this.Menu.store.height } }, this.props.children)));
    }
}
MenuComponent.defaultProps = new typings.Props();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MenuComponent;
//# sourceMappingURL=menu.component.js.map