"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    height: 40px;
    display: flex;
    align-items: center;
    flex-direction: row;
    transition: background-color .3s;
    & + & {
        border-top: 1px solid #eee;
    }

    &:hover{
        background-color: whitesmoke;
    }
`;
exports.TitleContainer = styled_components_1.default.div `
    display: flex;
    padding: 0 10px;
    font-size: 16px;
    font-weight: bold;
`;
exports.DescriptionContainer = styled_components_1.default.div `
    flex-grow: 1;
    flex-basis: 0%;
    font-size: 14px;
    color: #666;
`;
exports.ProgressContainer = styled_components_1.default.div `
    display: flex;
    align-items: center;
    width: 15rem;
`;
exports.ProgressText = styled_components_1.default.div `
    margin-left: 10px;
    color: #999;
`;
exports.OperateContainer = styled_components_1.default.div `
    display: flex;
    padding: 0 10px;
`;
exports.EffectDescriptionSpan = styled_components_1.default.span `
    margin-right: 10px;
`;
exports.OperateButton = styled_components_1.default.div `
    display: flex;
    align-items: center;
    justify-content: center;
    padding:5px 10px;
    border: 1px solid #ddd;
    border-top: none;
    border-bottom: none;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 14px;
    color: #555;
    cursor: pointer;
    
    ${props => props.theme.max &&
    `
    background-color: whitesmoke;
    color: #9e9e9e;
    text-shadow: 0 1px 1px #fff;
    cursor: default;
`}
`;
//# sourceMappingURL=building-card.style.js.map