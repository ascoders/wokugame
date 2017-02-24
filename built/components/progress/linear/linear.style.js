"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.span `
    display: flex;
    height: ${props => props.theme.height};
    background-color: whitesmoke;
    border-radius: 5px;
    flex-grow: 1;
`;
exports.Progress = styled_components_1.default.span `
    display: flex;
    background-color: #deae00;
    border-radius: 5px;
    height: ${props => props.theme.height};
    transition: width .3s;
`;
//# sourceMappingURL=linear.style.js.map