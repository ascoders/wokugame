"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const index_1 = require("./index");
ava_1.default('should return a new observable when no argument is provided', t => {
    const dynamicObj = index_1.observable();
    t.true(index_1.isObservable(dynamicObj));
});
ava_1.default('should return an observable wrapping of an object argument', t => {
    const obj = { prop: 'value' };
    const dynamicObj = index_1.observable(obj);
    t.false(obj === dynamicObj);
    t.true(index_1.isObservable(dynamicObj));
});
ava_1.default('should return the argument if test is already an observable', t => {
    const dynamicObj1 = index_1.observable();
    const dynamicObj2 = index_1.observable(dynamicObj1);
    t.true(dynamicObj1 === dynamicObj2);
});
ava_1.default('should return the same observable wrapper when called repeatedly with the same argument', t => {
    const obj = { prop: 'value' };
    const dynamicObj1 = index_1.observable(obj);
    const dynamicObj2 = index_1.observable(obj);
    t.true(dynamicObj1 === dynamicObj2);
});
ava_1.default('should never modify the underlying plain object', t => {
    const obj = {};
    const dynamicObj = index_1.observable(obj);
    obj.nested1 = {};
    dynamicObj.nested2 = index_1.observable({});
    t.false(index_1.isObservable(obj.nested1));
    t.false(index_1.isObservable(obj.nested2));
});
ava_1.default('should throw a TypeError on invalid arguments', t => {
    t.false(index_1.isObservable({}));
});
ava_1.default('should return true if an observable is passed as argument', t => {
    const dynamicObj = index_1.observable();
    t.true(index_1.isObservable(dynamicObj));
});
ava_1.default('should return false if a non observable is passed as argument', t => {
    const obj1 = { prop: 'value' };
    const obj2 = new Proxy({}, {});
    t.false(index_1.isObservable(obj1));
    t.false(index_1.isObservable(obj2));
});
ava_1.default('should observe basic properties', t => {
    let data = 0;
    const dynamicObj = index_1.observable({ counter: 0 });
    index_1.observe(() => data = dynamicObj.counter);
    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => dynamicObj.counter = 7)
        .then(() => t.true(data === 7));
});
ava_1.default('should observe delete operations', t => {
    let data = '';
    const dynamicObj = index_1.observable({ prop: 'value' });
    index_1.observe(() => data = dynamicObj.prop);
    return Promise.resolve()
        .then(() => t.true(data === 'value'))
        .then(() => delete dynamicObj.prop)
        .then(() => t.true(data === undefined));
});
ava_1.default('should observe properties on the prototype chain', t => {
    let data = 0;
    const dynamicObj = index_1.observable({ counter: 0 });
    const parentDynamicObj = index_1.observable({ counter: 2 });
    Object.setPrototypeOf(dynamicObj, parentDynamicObj);
    index_1.observe(() => data = dynamicObj.counter);
    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => delete dynamicObj.counter)
        .then(() => t.true(data === 2))
        .then(() => parentDynamicObj.counter = 4)
        .then(() => t.true(data === 4))
        .then(() => dynamicObj.counter = 3)
        .then(() => t.true(data === 3));
});
ava_1.default('should observe function call chains', t => {
    let data = 0;
    const dynamicObj = index_1.observable({ counter: 0 });
    index_1.observe(() => data = getCounter());
    function getCounter() {
        return dynamicObj.counter;
    }
    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => dynamicObj.counter = 2)
        .then(() => t.true(data === 2));
});
ava_1.default('should observe for of iteration', t => {
    let data = '';
    const dynamicObj = index_1.observable({ array: ['Hello'] });
    index_1.observe(() => data = dynamicObj.array.join(' '));
    return Promise.resolve()
        .then(() => t.true(data === 'Hello'))
        .then(() => dynamicObj.array.push('World!'))
        .then(() => t.true(data === 'Hello World!'))
        .then(() => dynamicObj.array.shift())
        .then(() => t.true(data === 'World!'));
});
ava_1.default('should not observe set operations without a value change', t => {
    let data = '';
    const dynamicObj = index_1.observable({ prop: 'prop' });
    let numOfRuns = 0;
    function test() {
        data = dynamicObj.prop;
        numOfRuns++;
    }
    index_1.observe(test);
    return Promise.resolve()
        .then(() => t.true(data === 'prop'))
        .then(() => dynamicObj.prop = 'prop')
        .then(() => {
        t.true(numOfRuns === 1);
        t.true(data === 'prop');
    })
        .then(() => dynamicObj.prop = 'prop2')
        .then(() => dynamicObj.prop = 'prop2')
        .then(() => {
        t.true(numOfRuns === 2);
        t.true(data === 'prop2');
    });
});
ava_1.default('should not run synchronously after registration', t => {
    let data = '';
    const dynamicObj = index_1.observable({ prop: 'prop' });
    let numOfRuns = 0;
    index_1.observe(() => {
        data = dynamicObj.prop;
        numOfRuns++;
    });
    t.true(numOfRuns === 0);
    t.true(data === '');
    return Promise.resolve()
        .then(() => {
        t.true(numOfRuns === 1);
        t.true(data === 'prop');
    })
        .then(() => {
        dynamicObj.prop = 'new prop';
    })
        .then(() => {
        t.true(numOfRuns === 2);
        t.true(data === 'new prop');
    });
});
ava_1.default('should rerun maximum once per stack', t => {
    let data = 0;
    const dynamicObj = index_1.observable({ prop1: 0, prop2: 0 });
    let numOfRuns = 0;
    function test() {
        data = dynamicObj.prop1 + dynamicObj.prop2;
        numOfRuns++;
    }
    index_1.observe(test);
    return Promise.resolve()
        .then(() => {
        t.true(numOfRuns === 1);
        t.true(data === 0);
    })
        .then(() => {
        dynamicObj.prop1 = 1;
        dynamicObj.prop2 = 3;
        dynamicObj.prop1 = 2;
    })
        .then(() => {
        t.true(numOfRuns === 2);
        t.true(data === 5);
    });
});
ava_1.default('should avoid infinite loops', t => {
    const dynamicObj1 = index_1.observable({ prop: 'value1' });
    const dynamicObj2 = index_1.observable({ prop: 'value2' });
    let numOfRuns1 = 0;
    let numOfRuns2 = 0;
    function test1() {
        dynamicObj1.prop = dynamicObj2.prop;
        numOfRuns1++;
    }
    function test2() {
        dynamicObj2.prop = dynamicObj1.prop;
        numOfRuns2++;
    }
    index_1.observe(test1);
    index_1.observe(test2);
    return Promise.resolve()
        .then(() => dynamicObj1.prop = 'Hello')
        .then(() => t.true(dynamicObj2.prop === 'Hello'))
        .then(() => dynamicObj1.prop = 'World!')
        .then(() => t.true(dynamicObj2.prop === 'World!'))
        .then(() => {
        t.true(numOfRuns1 === 3);
        t.true(numOfRuns2 === 3);
    });
});
ava_1.default('should accept a list of arguments and set the observer arguments to them', t => {
    let data = 0;
    const dynamicObj1 = index_1.observable({ counter: 0 });
    const dynamicObj2 = index_1.observable({ counter: 0 });
    index_1.observe(setdata, dynamicObj1, dynamicObj2);
    function setdata(state1, state2) {
        data = state1.counter + state2.counter;
    }
    return Promise.resolve()
        .then(() => dynamicObj1.counter = 2)
        .then(() => t.true(data === 2))
        .then(() => dynamicObj2.counter = 1)
        .then(() => t.true(data === 3));
});
ava_1.default('should return an unobserve (object) signal', t => {
    let data = 0;
    const dynamicObj = index_1.observable({ counter: 0 });
    const signal = index_1.observe(() => data = dynamicObj.counter);
    t.true(typeof signal === 'object');
});
ava_1.default('should observe mutations', t => {
    let data;
    const dynamicObj = index_1.observable(new Set());
    index_1.observe(() => data = dynamicObj.has('value'));
    return Promise.resolve()
        .then(() => t.false(data))
        .then(() => dynamicObj.add('value'))
        .then(() => t.true(data))
        .then(() => dynamicObj.delete('value'))
        .then(() => t.false(data));
});
ava_1.default('should observe iteration', t => {
    let data;
    const dynamicObj = index_1.observable(new Set());
    index_1.observe(() => {
        data = 0;
        for (let num of dynamicObj) {
            data += num;
        }
    });
    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => dynamicObj.add(3))
        .then(() => t.true(data === 3))
        .then(() => dynamicObj.add(2))
        .then(() => t.true(data === 5))
        .then(() => dynamicObj.delete(2))
        .then(() => t.true(data === 3))
        .then(() => dynamicObj.clear())
        .then(() => t.true(data === 0));
});
ava_1.default('should not observe non value changing mutations', t => {
    let data;
    let numOfRuns = 0;
    const dynamicObj = index_1.observable(new Set());
    index_1.observe(() => {
        numOfRuns++;
        data = dynamicObj.has('value');
    });
    return Promise.resolve()
        .then(() => {
        t.false(data);
        t.true(numOfRuns === 1);
    })
        .then(() => dynamicObj.add('value'))
        .then(() => dynamicObj.add('value'))
        .then(() => {
        t.true(data);
        t.true(numOfRuns === 2);
    })
        .then(() => dynamicObj.delete('value'))
        .then(() => dynamicObj.delete('value'))
        .then(() => {
        t.false(data);
        t.true(numOfRuns === 3);
    });
});
ava_1.default('should observe mutations', t => {
    let data;
    const value = {};
    const dynamicObj = index_1.observable(new Set());
    index_1.observe(() => data = dynamicObj.has(value));
    return Promise.resolve()
        .then(() => t.false(data))
        .then(() => dynamicObj.add(value))
        .then(() => t.true(data))
        .then(() => dynamicObj.delete(value))
        .then(() => t.false(data));
});
ava_1.default('should observe mutations', t => {
    let data;
    const value = {};
    const dynamicObj = index_1.observable(new Set());
    index_1.observe(() => data = dynamicObj.has(value));
    return Promise.resolve()
        .then(() => t.false(data))
        .then(() => dynamicObj.add(value))
        .then(() => t.true(data))
        .then(() => dynamicObj.delete(value))
        .then(() => t.false(data));
});
ava_1.default('should not observe non value changing mutations', t => {
    let data;
    const value = {};
    let numOfRuns = 0;
    const dynamicObj = index_1.observable(new Set());
    index_1.observe(() => {
        numOfRuns++;
        data = dynamicObj.has(value);
    });
    return Promise.resolve()
        .then(() => {
        t.false(data);
        t.true(numOfRuns === 1);
    })
        .then(() => dynamicObj.add(value))
        .then(() => dynamicObj.add(value))
        .then(() => {
        t.true(data);
        t.true(numOfRuns === 2);
    })
        .then(() => dynamicObj.delete(value))
        .then(() => dynamicObj.delete(value))
        .then(() => {
        t.false(data);
        t.true(numOfRuns === 3);
    });
});
ava_1.default('should observe mutations', t => {
    let data;
    const dynamicObj = index_1.observable(new Map());
    index_1.observe(() => data = dynamicObj.get('key'));
    return Promise.resolve()
        .then(() => t.true(data === undefined))
        .then(() => dynamicObj.set('key', 'value'))
        .then(() => t.true(data === 'value'))
        .then(() => dynamicObj.delete('key'))
        .then(() => t.true(data === undefined));
});
ava_1.default('should observe iteration', t => {
    let data;
    const dynamicObj = index_1.observable(new Map());
    index_1.observe(() => {
        data = 0;
        for (let [key, num] of dynamicObj) {
            data += num;
        }
    });
    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => dynamicObj.set('key0', 3))
        .then(() => t.true(data === 3))
        .then(() => dynamicObj.set('key1', 2))
        .then(() => t.true(data === 5))
        .then(() => dynamicObj.delete('key0'))
        .then(() => t.true(data === 2))
        .then(() => dynamicObj.clear())
        .then(() => t.true(data === 0));
});
ava_1.default('should not observe non value changing mutations', t => {
    let data;
    let numOfRuns = 0;
    const dynamicObj = index_1.observable(new Map());
    index_1.observe(() => {
        numOfRuns++;
        data = dynamicObj.get('key');
    });
    return Promise.resolve()
        .then(() => {
        t.true(data === undefined);
        t.true(numOfRuns === 1);
    })
        .then(() => dynamicObj.set('key', 'value'))
        .then(() => dynamicObj.set('key', 'value'))
        .then(() => {
        t.true(data === 'value');
        t.true(numOfRuns === 2);
    })
        .then(() => dynamicObj.delete('key'))
        .then(() => dynamicObj.delete('key'))
        .then(() => {
        t.true(data === undefined);
        t.true(numOfRuns === 3);
    });
});
ava_1.default('should observe mutations', t => {
    let data;
    const key = {};
    const dynamicObj = index_1.observable(new WeakMap());
    index_1.observe(() => data = dynamicObj.get(key));
    return Promise.resolve()
        .then(() => t.true(data === undefined))
        .then(() => dynamicObj.set(key, 'value'))
        .then(() => t.true(data === 'value'))
        .then(() => dynamicObj.delete(key))
        .then(() => t.true(data === undefined));
});
ava_1.default('should not observe non value changing mutations', t => {
    let data;
    let numOfRuns = 0;
    const key = {};
    const dynamicObj = index_1.observable(new WeakMap());
    index_1.observe(() => {
        numOfRuns++;
        data = dynamicObj.get(key);
    });
    return Promise.resolve()
        .then(() => {
        t.true(data === undefined);
        t.true(numOfRuns === 1);
    })
        .then(() => dynamicObj.set(key, 'value'))
        .then(() => dynamicObj.set(key, 'value'))
        .then(() => {
        t.true(data === 'value');
        t.true(numOfRuns === 2);
    })
        .then(() => dynamicObj.delete(key))
        .then(() => dynamicObj.delete(key))
        .then(() => {
        t.true(data === undefined);
        t.true(numOfRuns === 3);
    });
});
ava_1.default('should run in registration order the first time', t => {
    let data = '';
    const dynamicObj = index_1.observable({ prop1: 'prop1', prop2: 'prop2', prop3: 'prop3' });
    index_1.observe(() => data += dynamicObj.prop1);
    index_1.observe(() => data += dynamicObj.prop2);
    index_1.observe(() => data += dynamicObj.prop3);
    dynamicObj.prop3 = 'p3';
    dynamicObj.prop1 = 'p1';
    dynamicObj.prop2 = 'p2';
    return Promise.resolve()
        .then(() => t.true(data === 'p1p2p3'));
});
ava_1.default('should remove the observed function from the queue', t => {
    let data;
    const dynamicObj = index_1.observable({ prop: 0 });
    let numOfRuns = 0;
    function test() {
        data = dynamicObj.prop;
        numOfRuns++;
    }
    const signal = index_1.observe(test);
    return Promise.resolve()
        .then(() => {
        dynamicObj.prop = 2;
        signal.unqueue();
    })
        .then(() => t.true(numOfRuns === 1));
});
ava_1.default('should unobserve the observed function', t => {
    let data = '';
    const dynamicObj = index_1.observable({ prop: '' });
    let numOfRuns = 0;
    function test() {
        data = dynamicObj.prop;
        numOfRuns++;
    }
    const signal = index_1.observe(test);
    return Promise.resolve()
        .then(() => dynamicObj.prop = 'Hello')
        .then(() => signal.unobserve())
        .then(() => {
        t.true(signal.callback === undefined);
        t.true(signal.proxies === undefined);
        t.true(signal.observedKeys === undefined);
    })
        .then(() => dynamicObj.prop = 'World')
        .then(() => dynamicObj.prop = '!')
        .then(() => t.true(numOfRuns === 2));
});
ava_1.default('should unobserve even if the function is registered for the stack', t => {
    let data;
    const dynamicObj = index_1.observable({ prop: 0 });
    let numOfRuns = 0;
    function test() {
        data = dynamicObj.prop;
        numOfRuns++;
    }
    const signal = index_1.observe(test);
    return Promise.resolve()
        .then(() => {
        dynamicObj.prop = 2;
        signal.unobserve();
    })
        .then(() => t.true(numOfRuns === 1));
});
ava_1.default('should observe properties when use extendObservable', t => {
    let data1;
    let data2;
    let numOfRuns = 0;
    const dynamicObj = index_1.observable({
        a: 0,
        b: 1
    });
    const signal = index_1.observe(() => {
        data1 = dynamicObj.a;
        data2 = dynamicObj.b;
        numOfRuns++;
    });
    return Promise.resolve()
        .then(() => t.true(numOfRuns === 1))
        .then(() => t.true(data1 === 0))
        .then(() => t.true(data2 === 1))
        .then(() => {
        index_1.extendObservable(dynamicObj, {
            a: 1,
            b: 2
        });
    })
        .then(() => t.true(numOfRuns === 2))
        .then(() => t.true(data1 === 1))
        .then(() => t.true(data2 === 2));
});
//# sourceMappingURL=dynamic-store.test.js.map