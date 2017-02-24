"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.GridContainer = styled_components_1.default.div `
    display: grid;
    flex-grow: 1;
    grid-template-columns: 200px 1fr 1fr 1fr; 
    grid-template-rows: 50px auto 200px 40px; 
    grid-template-areas: "header header header header" 
                         "sidebar main main main"
                         "sidebar main main main"
                         "footer footer footer footer";
`;
exports.Header = styled_components_1.default.div `
    grid-area: header;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: whitesmoke;
`;
exports.Main = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    grid-area: main;
    border-left: 1px solid #d9d9d9;
`;
exports.Sidebar = styled_components_1.default.div `
    grid-area: sidebar;
`;
exports.Footer = styled_components_1.default.div `
    grid-area: footer;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: #888;
`;
exports.SidebarMenuItem = styled_components_1.default.div `
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    color: #666;
    ${props => props.theme.active && 'background-color: antiquewhite;'}
`;
//# sourceMappingURL=game-simulated-planet.style.js.map