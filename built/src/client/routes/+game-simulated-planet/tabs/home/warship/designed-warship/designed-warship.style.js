"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.DesignedWarshipContainer = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    & + & {
        border-top: 1px solid #ddd;
    }
`;
exports.DesignedWarshipTitle = styled_components_1.default.div `
    font-weight: bold;
    padding: 10px;
`;
exports.DesignedWarshipDescription = styled_components_1.default.div `
    padding: 0 10px;
`;
exports.ProductButton = styled_components_1.default.span `

`;
exports.DeleteButton = styled_components_1.default.span `
    margin-left: 10px;
`;
//# sourceMappingURL=designed-warship.style.js.map