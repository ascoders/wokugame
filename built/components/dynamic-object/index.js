"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const built_ins_1 = require("./built-ins");
const proxies = new WeakMap();
const observers = new WeakMap();
const queuedObservers = new Set();
let queued = false;
let currentObserver = null;
function observable(obj = {}) {
    return proxies.get(obj) || toObservable(obj);
}
exports.observable = observable;
function toObservable(obj) {
    let dynamicObject;
    const builtIn = built_ins_1.default.get(obj.constructor);
    if (typeof builtIn === 'function' || typeof builtIn === 'object') {
        dynamicObject = builtIn(obj, registerObserver, queueObservers);
    }
    else if (!builtIn) {
        dynamicObject = new Proxy(obj, {
            get(target, key, receiver) {
                if (key === '$raw') {
                    return target;
                }
                const result = Reflect.get(target, key, receiver);
                const resultIsObject = typeof result === 'object' && result;
                const existProxy = resultIsObject && proxies.get(result);
                if (currentObserver) {
                    registerObserver(target, key);
                    if (resultIsObject) {
                        return existProxy || toObservable(result);
                    }
                }
                return existProxy || result;
            },
            set(target, key, value, receiver) {
                if (key === 'length' || value !== Reflect.get(target, key, receiver)) {
                    queueObservers(target, key);
                }
                if (typeof value === 'object' && value) {
                    value = value.$raw || value;
                }
                return Reflect.set(target, key, value, receiver);
            },
            deleteProperty(target, key) {
                if (Reflect.has(target, key)) {
                    queueObservers(target, key);
                }
                return Reflect.deleteProperty(target, key);
            }
        });
    }
    else {
        dynamicObject = obj;
    }
    proxies.set(obj, dynamicObject);
    proxies.set(dynamicObject, dynamicObject);
    observers.set(obj, new Map());
    return dynamicObject;
}
function queueObservers(target, key) {
    const observersForKey = observers.get(target).get(key);
    if (observersForKey) {
        observersForKey.forEach(queueObserver);
    }
}
function queueObserver(observer) {
    queuedObservers.add(observer);
    if (!queued) {
        queued = true;
        Promise.resolve().then(() => {
            queuedObservers.forEach(observer => {
                if (observer.callback) {
                    if (observer.once) {
                        observer.callback.apply(null, observer.proxies);
                        unobserve(observer);
                    }
                    else {
                        try {
                            currentObserver = observer;
                            observer.callback.apply(null, observer.proxies);
                        }
                        finally {
                            currentObserver = null;
                        }
                    }
                }
            });
            queuedObservers.clear();
            queued = false;
        });
    }
}
function registerObserver(target, key) {
    if (currentObserver) {
        const observersForTarget = observers.get(target);
        let observersForKey = observersForTarget.get(key);
        if (!observersForKey) {
            observersForKey = new Set();
            observersForTarget.set(key, observersForKey);
        }
        if (!observersForKey.has(currentObserver)) {
            observersForKey.add(currentObserver);
            currentObserver.observedKeys.push(observersForKey);
        }
    }
}
function isObservable(obj) {
    return (proxies.get(obj) === obj);
}
exports.isObservable = isObservable;
function unqueue(observer) {
    queuedObservers.delete(observer);
}
function unobserve(observer) {
    if (typeof observer === 'object') {
        if (observer.observedKeys) {
            observer.observedKeys.forEach(observersForKey => {
                observersForKey.delete(observer);
            });
        }
        observer.callback = observer.proxies = observer.observedKeys = undefined;
    }
}
function observe(callback, ...observeProxies) {
    const observer = {
        callback,
        proxies: observeProxies,
        observedKeys: [],
        unqueue: () => unqueue(observer),
        unobserve: () => unobserve(observer)
    };
    queueObserver(observer);
    return observer;
}
exports.observe = observe;
function extendObservable(originObj, targetObj) {
    return Object.assign(originObj, targetObj);
}
exports.extendObservable = extendObservable;
//# sourceMappingURL=index.js.map