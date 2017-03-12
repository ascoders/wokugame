"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    
`;
exports.FinalEffect = styled_components_1.default.div `
    display: flex;
`;
exports.Effect = styled_components_1.default.div `
    display: flex;
    align-items: center;
    padding: 10px;
`;
exports.EquipmentContainer = styled_components_1.default.div `
    display: flex;
    margin-top: 20px;
`;
exports.EquipmentArmsContainer = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0%;
`;
exports.EquipmentsContainer = styled_components_1.default.div `
    flex-grow: 2;
    flex-basis: 0%;
    border-left: 1px solid #ddd;
`;
exports.EquipmentTitle = styled_components_1.default.div `
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: whitesmoke;
`;
exports.EquipmentList = styled_components_1.default.div `
    height: 30rem;
    overflow-y: auto;
`;
exports.EquipmentItemContainer = styled_components_1.default.div `

`;
exports.EquipmentItemTitle = styled_components_1.default.div `
    padding: 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
`;
exports.EquipmentItemDetailContainer = styled_components_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 7px;
    & + & {
        padding-top: 0;
    }
`;
exports.EquipmentItemDetailContainerTwoColumn = styled_components_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 7px;
    float: left;
    width: 50%;
`;
exports.EquipmentItemDetailTitleContainer = styled_components_1.default.div `
`;
exports.EquipmentItemDetailTitle = styled_components_1.default.div ``;
exports.EquipmentItemDetailDescription = styled_components_1.default.div `
    color: #777;
    font-size: 12px;
    margin-top: 3px;
`;
exports.EquipmentItemDetailOperation = styled_components_1.default.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
exports.Green = styled_components_1.default.span `
    color: green;
`;
exports.AddOrDeleteButton = styled_components_1.default.span `
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 30px;
    padding: 5px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    user-select: none;
`;
exports.EquipmentUseCount = styled_components_1.default.span `
    padding: 0 10px;
`;
exports.Red = styled_components_1.default.span `
    color: red;
`;
exports.OkButton = styled_components_1.default.span `
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
`;
exports.NameInput = styled_components_1.default.input `
    padding: 10px;
    outline: none;
    border: 1px solid #ddd;
`;
//# sourceMappingURL=detail.style.js.map