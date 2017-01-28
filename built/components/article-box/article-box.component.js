"use strict";
const React = require("react");
const typings = require("./article-box.type");
const article_box_style_1 = require("./article-box.style");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (props = new typings.Props()) => {
    return (React.createElement(article_box_style_1.Container, null,
        React.createElement(article_box_style_1.LeftContainer, null,
            React.createElement(article_box_style_1.CategoryContainer, null, "\u7C7B\u522B"),
            React.createElement(article_box_style_1.TitleContainer, null, "\u6807\u9898"),
            React.createElement(article_box_style_1.OtherContainer, null, "\u65E5\u671F")),
        React.createElement(article_box_style_1.RightContainer, null)));
};
//# sourceMappingURL=article-box.component.js.map