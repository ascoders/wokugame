"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    flex-grow: 1;
`;
exports.LeftContainer = styled_components_1.default.div `
    flex-grow: 1;
    flex-basis: 0%;
`;
exports.RightContainer = styled_components_1.default.div `
    flex-grow: 1;
    flex-basis: 0%;
`;
exports.Title = styled_components_1.default.div `
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;
exports.AirshipContainer = styled_components_1.default.div `
    border-bottom: 1px solid #ddd;
`;
exports.AirshipCategory = styled_components_1.default.div `
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    padding: 10px;
    background-color: whitesmoke;
`;
exports.NoDrawingContainer = styled_components_1.default.div `
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    padding: 10px;
    color: #999;
`;
exports.AirshipContent = styled_components_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &+& {
        padding-top: 0;
    }
`;
exports.AirshipContentLeft = styled_components_1.default.div `

`;
exports.AirshipContentRight = styled_components_1.default.div `

`;
//# sourceMappingURL=warship.style.js.map