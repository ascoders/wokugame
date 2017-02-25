"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
exports.Title = styled_components_1.default.div `
    background-color: whitesmoke;
    padding:10px;
    font-size: 1rem;
    color: #666;
    font-weight: bold;
`;
exports.ListContainer = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px 20px;
`;
exports.HeaderContainer = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    min-height: 100px;
`;
exports.MainContainer = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
exports.HeaderInformationContainer = styled_components_1.default.div `
    display: flex;
    align-items: center;
    padding: 0 20px;
    min-height: 40px;
    margin-top: 10px;
`;
exports.HeaderInformationItem = styled_components_1.default.div `
    padding: 5px 10px;
    background-color: whitesmoke;
    border: 1px solid #ddd;
    margin-right: 10px;
    border-radius: 5px;
    color: #666;
`;
exports.HeaderOperationContainer = styled_components_1.default.div `
    display: flex;
    align-items: center;
    padding: 0 20px;
    min-height: 60px;
`;
exports.ButtonContainer = styled_components_1.default.div `
    display: flex;
    padding: 20px;
`;
exports.ScrollContainer = styled_components_1.default.div `
    overflow-y: auto;
    flex-grow: 1;
`;
//# sourceMappingURL=home.style.js.map