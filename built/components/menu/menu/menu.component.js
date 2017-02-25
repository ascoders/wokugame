"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./menu.type");
const dynamic_react_1 = require("../../dynamic-react");
const store_1 = require("../store");
const menu_style_1 = require("./menu.style");
class MenuComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.storeProps = new store_1.StoreProps();
    }
    componentWillMount() {
        if (this.props.height) {
            this.storeProps.menuAction.setHeight(this.props.height);
        }
    }
    render() {
        return (React.createElement(dynamic_react_1.Provider, Object.assign({}, this.storeProps),
            React.createElement(menu_style_1.ContainerComponent, { theme: { height: this.storeProps.menuStore.height } }, this.props.children)));
    }
}
MenuComponent.defaultProps = new typings.Props();
exports.default = MenuComponent;
//# sourceMappingURL=menu.component.js.map