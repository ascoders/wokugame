"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.default = (origin, replaceFunction) => {
    let strStore = '';
    let variableCount = 0;
    const strElement = [];
    for (let index in origin) {
        const indexNumber = Number(index);
        if (origin[indexNumber] === '%') {
            if (indexNumber === origin.length - 1) {
            }
            else {
                if (origin[indexNumber + 1] === 'd') {
                    strElement.push((React.createElement("span", { key: indexNumber + 'str' }, strStore)));
                    strStore = '';
                    strElement.push(replaceFunction(variableCount++));
                    continue;
                }
                else {
                }
            }
        }
        if (origin[indexNumber] === 'd') {
            if (indexNumber === 0) {
            }
            else {
                if (origin[indexNumber - 1] === '%') {
                    continue;
                }
                else {
                }
            }
        }
        strStore += origin[indexNumber];
        if (indexNumber === origin.length - 1 && strStore !== '') {
            strElement.push((React.createElement("span", { key: indexNumber }, strStore)));
        }
    }
    return strElement;
};
//# sourceMappingURL=highlight-render.js.map