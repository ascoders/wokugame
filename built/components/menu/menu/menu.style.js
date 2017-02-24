"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const lightColor = '#333';
const lightColorActive = '#666';
exports.ContainerComponent = styled_components_1.default.div `
    display: flex;
    flex-direction: row;
    background-color: ${lightColor};
    height: ${props => props.theme.height}px;

    [name='woku-menu-item'], [name='woku-menu-item'] a {
        color: white;
        text-decoration: none;
    }

    [name='woku-menu-item']:hover, [name='woku-menu-subtree'] a:hover {
        background-color: ${lightColorActive};
    }

    [name='woku-menu-subtree'] {
        background-color: ${lightColor};
    }
`;
//# sourceMappingURL=menu.style.js.map