"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./handlers");
exports.default = (injectClass) => (target, propertyKey) => {
    if (!target[handlers_1.injectSymbol]) {
        target[handlers_1.injectSymbol] = new Map();
    }
    target[handlers_1.injectSymbol].set(propertyKey, injectClass);
};
//# sourceMappingURL=decorators.js.map