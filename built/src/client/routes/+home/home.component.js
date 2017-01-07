"use strict";
const React = require("react");
const typings = require("./home.type");
const index_1 = require("../../../../frame/index");
const styles = require('./home.css');
const article_box_component_1 = require("../../../../components/article-box/article-box.component");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = index_1.connect(state => {
    return {
        headerColor: state.application.headerColor
    };
})((props = new typings.Props()) => {
    const handleClick = () => {
        props.dispatch({
            type: 'application/changeHeaderColor',
            payload: '123'
        });
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: styles.bannerImage }),
        React.createElement("div", { className: styles.articleContainer },
            React.createElement(article_box_component_1.default, null))));
});
//# sourceMappingURL=home.component.js.map