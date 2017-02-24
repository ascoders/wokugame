"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const backgroundColor = '#eee';
const backgroundActiveColor = '#ddd';
const animShadow = styled_components_1.keyframes `
    to {
        box-shadow: 0 0 100px 50px #333;
        opacity: 0;
    }
`;
exports.LabelContainer = styled_components_1.default.label `
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    vertical-align: top;
    background-color: ${backgroundColor};
    zIndex: ${props => props.theme.focus ? 1 : 0};
`;
exports.Label = styled_components_1.default.span `
    padding: 0 15px;
    white-space: nowrap;
    font-weight: bold;
    font-size: 1.2rem;
    color: #666;
`;
exports.InputContainer = styled_components_1.default.div `
    position: relative;
    flex-grow: 1;
`;
exports.Shadow = styled_components_1.default.div `
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`;
exports.Input = styled_components_1.default.input `
    width: 100%;
    background: #fff;
    border: 2px solid ${backgroundColor};
    color: #666;
    transition: border-color 0.3s;
    font-size: 1.4rem;

    position: relative;
    display: block;
    padding: 1.2rem;
    font-weight: bold;

    &:focus {
        border-color: ${backgroundActiveColor};
        outline: none;

        & + [name='woku-input-shadow'] {
            animation: ${animShadow} 0.3s forwards;
        }
    }
`;
//# sourceMappingURL=input.style.js.map