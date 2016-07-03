"use strict";
const React = require('react');
const defintion = require('./defintion');
const process = require('process');
class RoutesBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = new defintion.State();
        if (process.browser) {
            document.title = this.getTitle();
        }
    }
    getTitle() {
        return null;
    }
}
RoutesBase.defaultProps = new defintion.Props();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoutesBase;
