"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    ${props => props.theme.noScroll ? `
        height: 100vh;
        ` : `
        min-height: 100vh;
    `}
`;
//# sourceMappingURL=layout.style.js.map