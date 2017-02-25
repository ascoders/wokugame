"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const dynamic_object_1 = require("../dynamic-object");
const shallow_equal_1 = require("../shallow-equal");
exports.default = (decoratedComponent) => {
    return _a = class WrapComponent extends React.Component {
            shouldComponentUpdate(nextProps) {
                if (!shallow_equal_1.default(this.props, nextProps)) {
                    return true;
                }
                return false;
            }
            componentWillMount() {
                this.setNextState();
                this.signal = dynamic_object_1.observe(() => {
                    this.setNextState();
                });
            }
            componentWillUnmount() {
                this.signal.unobserve();
            }
            setNextState() {
                this.forceUpdate();
            }
            render() {
                return React.createElement(decoratedComponent, Object.assign({}, this.context.dyStores, this.props));
            }
        },
        _a.contextTypes = {
            dyStores: React.PropTypes.object
        },
        _a;
    var _a;
};
//# sourceMappingURL=connect.js.map