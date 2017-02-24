"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    display: flex;
    cursor: pointer;
    height: ${props => props.theme.height}px;
    &:hover {
        transition: background-color .3s;
    }
    & a {
        display: flex;
        align-items: center;
        padding: 0 20px;
        white-space: nowrap;
    }
`;
//# sourceMappingURL=menu-item.style.js.map