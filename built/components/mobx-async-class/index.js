"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mobx_1 = require("mobx");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (errorHandler) => (target) => {
    const keys = Object.getOwnPropertyNames(target.prototype);
    keys.forEach(key => {
        if (target.prototype[key].prototype && target.prototype[key].prototype.constructor.isMobxAction) {
            const func = target.prototype[key];
            target.prototype[key] = (...args) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield func.apply(this, args);
                }
                catch (error) {
                    errorHandler && errorHandler(error);
                }
            });
        }
    });
    return target;
};
exports.asyncMethod = (target, propertyKey, descriptor) => {
    const func = mobx_1.action(descriptor.value);
    return {
        configurable: true,
        get() {
            return (...args) => {
                return Promise.resolve(func.apply(this, args)).catch(error => {
                    console.log(error);
                });
            };
        },
        set(newValue) {
            return newValue;
        }
    };
};
//# sourceMappingURL=index.js.map