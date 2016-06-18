"use strict";
const React = require('react');
const react_router_1 = require('react-router');
class PageA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        document.title = 'page A';
    }
    render() {
        return (React.createElement("div", {className: "_namespace"}, React.createElement(react_router_1.Link, {to: "/"}, "back")));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PageA;
