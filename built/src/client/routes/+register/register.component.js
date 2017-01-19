"use strict";
const React = require("react");
const typings = require("./register.type");
const index_1 = require("../../../../frame/index");
const styles = require('./register.css');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index_1.connect(state => {
    return {
        navbarHeight: state.application.navbarHeight
    };
})((props = new typings.Props()) => {
    return (React.createElement("div", { className: styles.container }));
});
//# sourceMappingURL=register.component.js.map