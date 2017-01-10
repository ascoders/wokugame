"use strict";
const React = require("react");
const typings = require("./article-box.type");
const styles = require('./article-box.css');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (props = new typings.Props()) => {
    return (React.createElement("div", { className: styles.container },
        React.createElement("div", { className: styles.leftContainer },
            React.createElement("div", { className: styles.categoryContainer }, "666"),
            React.createElement("div", { className: styles.titleContainer }, "\u6807\u9898\u5BB9\u5668"),
            React.createElement("div", { className: styles.otherContainer }, "\u65E5\u671F")),
        React.createElement("div", { className: styles.rightContainer })));
};
//# sourceMappingURL=article-box.component.js.map