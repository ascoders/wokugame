"use strict";
const React = require("react");
const typings = require("./menu.type");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const reducers_1 = require("../reducers");
const styles = require('./menu.css');
class Menu extends React.Component {
    componentWillMount() {
        this.store = redux_1.createStore(reducers_1.default);
        if (this.props.height) {
            this.store.dispatch({
                type: 'setHeight',
                payload: this.props.height
            });
        }
    }
    render() {
        return (React.createElement(react_redux_1.Provider, { store: this.store },
            React.createElement("div", { className: styles.container, style: { height: this.store.getState().height } }, this.props.children)));
    }
}
Menu.defaultProps = new typings.Props();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Menu;
//# sourceMappingURL=menu.component.js.map