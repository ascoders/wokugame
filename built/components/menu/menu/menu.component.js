"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./menu.type");
const dynamic_react_1 = require("../../dynamic-react");
const dependency_inject_1 = require("../../dependency-inject");
const store_1 = require("../store");
const menu_style_1 = require("./menu.style");
class MenuComponent extends React.Component {
    componentWillMount() {
        const container = new dependency_inject_1.Container();
        container.set(store_1.Store, new store_1.Store());
        container.set(store_1.Action, new store_1.Action());
        this.store = container.get(store_1.Store);
        this.action = container.get(store_1.Action);
        if (this.props.height) {
            this.action.setHeight(this.props.height);
        }
    }
    render() {
        return (React.createElement(dynamic_react_1.Provider, { stores: { store: this.store }, actions: { action: this.action } },
            React.createElement(menu_style_1.ContainerComponent, { theme: { height: this.store.height } }, this.props.children)));
    }
}
MenuComponent.defaultProps = new typings.Props();
exports.default = MenuComponent;
//# sourceMappingURL=menu.component.js.map