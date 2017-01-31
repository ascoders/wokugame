"use strict";
const mobx_1 = require("mobx");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (errorHandler) => (target, propertyKey, descriptor) => {
    const func = mobx_1.action(descriptor.value);
    return {
        configurable: true,
        get() {
            return (...args) => {
                return Promise.resolve(func.apply(this, args)).catch(error => {
                    if (errorHandler) {
                        return errorHandler(error);
                    }
                });
            };
        },
        set(newValue) {
            return newValue;
        }
    };
};
//# sourceMappingURL=index.js.map