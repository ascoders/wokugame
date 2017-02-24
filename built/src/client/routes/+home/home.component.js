"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typings = require("./home.type");
const dynamic_react_1 = require("../../../../components/dynamic-react");
const article_box_component_1 = require("../../../../components/article-box/article-box.component");
const home_style_1 = require("./home.style");
exports.default = dynamic_react_1.Connect(state => {
    return {};
})((props = new typings.Props()) => {
    return (React.createElement("div", null,
        React.createElement(home_style_1.ArticleContainer, null,
            React.createElement(article_box_component_1.default, null))));
});
//# sourceMappingURL=home.component.js.map