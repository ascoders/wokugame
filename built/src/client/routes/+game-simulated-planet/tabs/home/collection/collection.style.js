"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    position: relative;
    display: flex;
    width: 5rem;
    height: 2rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color .3s;
    user-select: none;
    color: #555;
    overflow: hidden;
    
    &:hover {
        background-color: whitesmoke;
    }
    
    &:active {
        background-color: #eee;
    }

    ${props => props.theme.disabled && `
        background-color: #eee;
        cursor: default;
        &:active {
            background-color: whitesmoke;
        }
    `}
`;
exports.Text = styled_components_1.default.span `
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

     ${props => props.theme.disabled && `
       color: #aaa;
    `}
`;
exports.Progress = styled_components_1.default.div `
    background-color: #ddd;
    height: 2rem;
    transition: width .3s;
`;
//# sourceMappingURL=collection.style.js.map