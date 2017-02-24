"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.div `
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    outline: 0;
    background-color: rgba(0,0,0,.35);
    ${props => !props.theme.show && 'display:none;'}
`;
exports.ModalContainer = styled_components_1.default.div `
    width: 60%;
    margin: 30px auto;
    background-color: white;
`;
exports.ModalContent = styled_components_1.default.div `

`;
exports.ModalHeader = styled_components_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 15px 20px;
    border-bottom: 1px solid #ddd;
`;
exports.ModalTitle = styled_components_1.default.span `
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444;
    font-size: 20px;
    font-weight: bold;
`;
exports.ModalBody = styled_components_1.default.div `
    padding: 20px;
`;
exports.CloseButton = styled_components_1.default.span `
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .2;
    transition: opacity .3s;
    outline: none;
    &:hover {
        opacity: .6;
    }
`;
//# sourceMappingURL=modal.style.js.map