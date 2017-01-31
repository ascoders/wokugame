"use strict";
const React = require("react");
const typings = require("./home.type");
const mobx_react_1 = require("mobx-react");
const article_box_component_1 = require("../../../../components/article-box/article-box.component");
const home_style_1 = require("./home.style");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mobx_react_1.inject('User')(mobx_react_1.observer((props = new typings.Props()) => {
    return (React.createElement("div", null,
        React.createElement(home_style_1.BannerImage, null),
        React.createElement(home_style_1.ArticleContainer, null,
            React.createElement(article_box_component_1.default, null))));
}));
//# sourceMappingURL=home.component.js.map