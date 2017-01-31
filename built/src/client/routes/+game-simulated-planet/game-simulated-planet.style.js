"use strict";
const styled_components_1 = require("styled-components");
exports.GridContainer = styled_components_1.default.div `
    display: grid;
    flex-grow: 1;
    grid-template-columns: repeat(4 1fr); 
    grid-template-rows: 50px auto 40px; 
    grid-template-areas: "header header header header" 
                         "sidebar main main main"
                         "footer footer footer footer";
`;
exports.Header = styled_components_1.default.div `
    grid-area: header;
    background-color: whitesmoke;
`;
exports.Main = styled_components_1.default.div `
    grid-area: main;
`;
exports.Sidebar = styled_components_1.default.div `
    grid-area: sidebar;
`;
exports.Footer = styled_components_1.default.div `
    grid-area: footer;
    background-color: whitesmoke;
`;
//# sourceMappingURL=game-simulated-planet.style.js.map