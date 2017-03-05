"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const dynamic_object_1 = require("../dynamic-object");
const specialReactKeys = new Set(['children', 'key', 'ref']);
class Provider extends React.Component {
    getChildContext() {
        const stores = Object.assign({}, this.context.dyStores);
        for (let key in this.props) {
            if (!specialReactKeys.has(key)) {
                const store = this.props[key];
                stores[key] = dynamic_object_1.observable(store);
                for (let storeKey in store) {
                    if (typeof store[storeKey] === 'function') {
                        store[storeKey] = store[storeKey].bind(stores[key]);
                    }
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