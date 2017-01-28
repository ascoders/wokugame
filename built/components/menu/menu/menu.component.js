"use strict";
const React = require("react");
const typings = require("./menu.type");
const mobx_react_1 = require("mobx-react");
const index_1 = require("../stores/index");
const menu_style_1 = require("./menu.style");
class Menu extends React.Component {
    componentWillMount() {
        this.menu = new index_1.default();
        if (this.props.height) {
            this.menu.setHeight(this.props.height);
        }
    }
    render() {
        return (React.createElement(mobx_react_1.Provider, { menu: this.menu },
            React.createElement(menu_style_1.Container, { theme: { height: this.menu.store.height } }, this.props.children)));
    }
}
Menu.defaultProps = new typings.Props();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Menu;
//# sourceMappingURL=menu.component.js.map