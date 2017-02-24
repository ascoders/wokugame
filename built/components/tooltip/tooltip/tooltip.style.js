"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    visibility: hidden;
    background: #394b59;
    color: #f5f8fa;
    border-radius: 3px;
    text-align: center;
    padding: 7px 12px;
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2);
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity .3s;
    white-space: nowrap;
    
    ${props => props.theme.show && `
        opacity: 1;
        visibility: visible;
    `}
    
    ${props => props.theme.position === 'left' && `
        &::after {
            content: " ";
            position: absolute;
            top: 50%;
            left: 100%;
            margin-top: -5px;
            margin-right: -10px;
            border: 5px solid transparent;
            border-left-color: #394b59;
        }
    `}
    
    ${props => props.theme.position === 'top' && `
        &::after {
             content: " ";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border: 5px solid transparent;
            border-top-color: #394b59;
        }
    `}
    
    ${props => props.theme.position === 'right' && `
        &::after {
            content: " ";
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -5px;
            margin-left: -10px;
            border: 5px solid transparent;
            border-right-color: #394b59;
        }
    `}
    
    ${props => props.theme.position === 'bottom' && `
        &::after {
            content: " ";
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -5px;
            margin-top: -10px;
            border: 5px solid transparent;
            border-bottom-color: #394b59;
        }
    `}
`;
exports.Shadow = styled_components_1.default.div `
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.3;
    backgroundColor: 'black';
    display: ${props => props.theme.show ? 'block' : 'none'};
    zIndex:${props => props.theme.zIndex ? props.theme.zIndex : 0};
`;
//# sourceMappingURL=tooltip.style.js.map