"use strict";
const styled_components_1 = require("styled-components");
exports.Container = styled_components_1.default.span `
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #a49ef0;
    border-color: #a49ef0;
    color: #FFF;
    padding: 1rem;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 0.3rem;
    user-select: none;
    
    &:active {
        background-color: #827ae1;
        border-color: #827ae1;
        color: #5246e2;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
        text-decoration: none;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
    }
`;
//# sourceMappingURL=button.style.js.map