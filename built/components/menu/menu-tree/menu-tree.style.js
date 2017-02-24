"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const fadeInFromNone = styled_components_1.keyframes `
    0% {
        display: none;
        opacity: 0;
    }
    1% {
        display: block;
        opacity: 0;
    }
    100% {
        display: block;
        opacity: 1;
    }
`;
exports.Container = styled_components_1.default.div `
    display: flex;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    &:hover {
        transition: background-color .3s;
    }
    height: ${props => props.theme.height}px;
`;
exports.TreeItem = styled_components_1.default.div `
    display: none;
    opacity: 0;
    position: absolute;
    top: ${props => props.theme.top}px;
    left: 0;
    [name='woku-menu-tree']:hover & {
        display: block;
        opacity: 1;
        animation: ${fadeInFromNone} 0.3s ease-out;
    }
`;
//# sourceMappingURL=menu-tree.style.js.map