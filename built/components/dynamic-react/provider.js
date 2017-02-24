"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const dynamic_object_1 = require("../dynamic-object");
class Provider extends React.Component {
    getChildContext() {
        const stores = Object.assign({}, this.context.dyStores);
        for (let key in this.props.stores) {
            stores[key] = dynamic_object_1.observable(this.props.stores[key]);
        }
        for (let key in this.props.actions) {
            const action = this.props.actions[key];
            stores[key] = dynamic_object_1.observable(action);
            for (let actionKey in action) {
                if (typeof action[actionKey] === 'function') {
                    action[actionKey] = action[actionKey].bind(stores[key]);
                }
            }
        }
        return {
            dyStores: stores
        };
    }
    render() {
        return React.Children.only(this.props.children);
    }
}
Provider.contextTypes = {
    dyStores: React.PropTypes.object
};
Provider.childContextTypes = {
    dyStores: React.PropTypes.object.isRequired
};
exports.default = Provider;
//# sourceMappingURL=provider.js.map