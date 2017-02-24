"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./handlers");
class Container {
    constructor() {
        this.instances = new WeakMap();
    }
    set(setClass, instance) {
        if (!this.instances.has(setClass)) {
            this.instances.set(setClass, instance);
        }
    }
    get(getClass) {
        if (!this.instances.has(getClass)) {
            throw new Error(`${getClass.name} 未注册。先使用 set 方法注册，再使用 get 获取`);
        }
        const instance = this.instances.get(getClass);
        if (!instance[handlers_1.injectSymbol]) {
            return instance;
        }
        for (let [propertyKey, injectClass] of instance[handlers_1.injectSymbol]) {
            Object.defineProperty(instance, propertyKey, {
                enumerable: true,
                writable: true,
                configurable: true,
                value: this.instances.get(injectClass)
            });
        }
        return instance;
    }
}
exports.default = Container;
//# sourceMappingURL=container.js.map