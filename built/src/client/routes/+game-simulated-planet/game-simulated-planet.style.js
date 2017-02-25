"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
exports.HeaderContainer = styled_components_1.default.div `
    min-height: 30px;
    background-color: #eee;
`;
exports.TipContainer = styled_components_1.default.div `
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: #666;
    font-size: 14px;
    min-height: 30px;
    background-color: whitesmoke;
`;
exports.ContentContainer = styled_components_1.default.div `
    display: flex;
    flex-grow: 1;
`;
exports.SidebarContainer = styled_components_1.default.div `
    width: 150px;
    border-right: 1px solid #ddd;
`;
exports.SidebarItem = styled_components_1.default.div `

`;
exports.MainContainer = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
//# sourceMappingURL=game-simulated-planet.style.js.map