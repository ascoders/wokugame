"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (errorHandler) => (target) => {
    let keys = Object.getOwnPropertyNames(target.prototype);
    keys.forEach(key => {
        console.log(key);
        console.log(target.prototype);
    });
    return target;
};
//# sourceMappingURL=index.js.map