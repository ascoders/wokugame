"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
`;
exports.TitleContainer = styled_components_1.default.div `
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #d9d9d9;
    min-height: 30px;
`;
exports.PaneContainer = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
`;
exports.TabTitle = styled_components_1.default.div `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 16px 4px;
    cursor: pointer;
    margin-right: 2px;
    border: 1px solid #d9d9d9;
    border-radius: 6px 6px 0 0;
    color: #666;
    margin-bottom: -1px;
    ${props => !props.theme.active && 'background-color: whitesmoke;'}
    ${props => props.theme.active && 'border-bottom-color: white;'}
`;
//# sourceMappingURL=tabs.style.js.map