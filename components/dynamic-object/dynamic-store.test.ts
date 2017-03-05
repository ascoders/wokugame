import test from 'ava'
import {observe, observable, isObservable, extendObservable} from './index'

/**
 * observable
 */

test('should return a new observable when no argument is provided', t => {
    const dynamicObj = observable()
    t.true(isObservable(dynamicObj))
})

test('should return an observable wrapping of an object argument', t => {
    const obj = {prop: 'value'}
    const dynamicObj = observable(obj)
    t.false(obj === dynamicObj)
    t.true(isObservable(dynamicObj))
})

test('should return the argument if test is already an observable', t => {
    const dynamicObj1 = observable()
    const dynamicObj2 = observable(dynamicObj1)
    t.true(dynamicObj1 === dynamicObj2)
})

test('should return the same observable wrapper when called repeatedly with the same argument', t => {
    const obj = {prop: 'value'}
    const dynamicObj1 = observable(obj)
    const dynamicObj2 = observable(obj)
    t.true(dynamicObj1 === dynamicObj2)
})

test('should never modify the underlying plain object', t => {
    const obj = {} as any
    const dynamicObj = observable(obj)
    obj.nested1 = {}
    dynamicObj.nested2 = observable({})
    t.false(isObservable(obj.nested1))
    t.false(isObservable(obj.nested2))
})

/**
 isObservable
 */
test('should throw a TypeError on invalid arguments', t => {
    t.false(isObservable({}))
})

test('should return true if an observable is passed as argument', t => {
    const dynamicObj = observable()
    t.true(isObservable(dynamicObj))
})

test('should return false if a non observable is passed as argument', t => {
    const obj1 = {prop: 'value'}
    const obj2 = new Proxy({}, {})
    t.false(isObservable(obj1))
    t.false(isObservable(obj2))
})

/**
 * observe
 */

test('should observe basic properties', t => {
    let data = 0
    const dynamicObj = observable({counter: 0})
    observe(() => data = dynamicObj.counter)

    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => dynamicObj.counter = 7)
        .then(() => t.true(data === 7))
})

test('should observe delete operations', t => {
    let data = ''
    const dynamicObj = observable({prop: 'value'})
    observe(() => data = dynamicObj.prop)

    return Promise.resolve()
        .then(() => t.true(data === 'value'))
        .then(() => delete dynamicObj.prop)
        .then(() => t.true(data === undefined))
})

test('should observe properties on the prototype chain', t => {
    let data = 0
    const dynamicObj = observable({counter: 0})
    const parentDynamicObj = observable({counter: 2})
    Object.setPrototypeOf(dynamicObj, parentDynamicObj)
    observe(() => data = dynamicObj.counter)

    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => delete dynamicObj.counter)
        .then(() => t.true(data === 2))
        .then(() => parentDynamicObj.counter = 4)
        .then(() => t.true(data === 4))
        .then(() => dynamicObj.counter = 3)
        .then(() => t.true(data === 3))
})

test('should observe function call chains', t => {
    let data = 0
    const dynamicObj = observable({counter: 0})
    observe(() => data = getCounter())

    function getCounter() {
        return dynamicObj.counter
    }

    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => dynamicObj.counter = 2)
        .then(() => t.true(data === 2))
})

test('should observe for of iteration', t => {
    let data = ''
    const dynamicObj = observable({array: ['Hello']})
    observe(() => data = dynamicObj.array.join(' '))

    return Promise.resolve()
        .then(() => t.true(data === 'Hello'))
        .then(() => dynamicObj.array.push('World!'))
        .then(() => t.true(data === 'Hello World!'))
        .then(() => dynamicObj.array.shift())
        .then(() => t.true(data === 'World!'))
})

// test('should observe for in iteration', t => {
//     let data = 0
//     const dynamicObj: any = observable({prop: 0})
//     observe(() => {
//         data = 0
//         for (let key in dynamicObj) {
//             data += dynamicObj[key]
//         }
//     })
//
//     return Promise.resolve()
//         .then(() => t.true(data === 0))
//         .then(() => dynamicObj.prop = 1)
//         .then(() => t.true(data === 1))
//         .then(() => dynamicObj.prop1 = 1)
//         .then(() => t.true(data === 2))
//         .then(() => dynamicObj.prop2 = 3)
//         .then(() => t.true(data === 5))
//         .then(() => dynamicObj.prop1 = 6)
//         .then(() => t.true(data === 10))
// })

// test('should not observe well-known symbols', t => {
//     let data = ''
//     const dynamicObj = observable({[Symbol.toStringTag]: 'myString'})
//     observe(() => data = String(dynamicObj))
//
//     return Promise.resolve()
//         .then(() => expect(data).to.equal('[object myString]'))
//         .then(() => dynamicObj[Symbol.toStringTag] = 'otherString')
//         .then(() => expect(data).to.equal('[object myString]'))
// })

test('should not observe set operations without a value change', t => {
    let data = ''
    const dynamicObj = observable({prop: 'prop'})

    let numOfRuns = 0

    function test() {
        data = dynamicObj.prop
        numOfRuns++
    }

    observe(test)

    return Promise.resolve()
        .then(() => t.true(data === 'prop'))
        .then(() => dynamicObj.prop = 'prop')
        .then(() => {
            t.true(numOfRuns === 1)
            t.true(data === 'prop')
        })
        .then(() => dynamicObj.prop = 'prop2')
        .then(() => dynamicObj.prop = 'prop2')
        .then(() => {
            t.true(numOfRuns === 2)
            t.true(data === 'prop2')
        })
})

test('should not run synchronously after registration', t => {
    let data = ''
    const dynamicObj = observable({prop: 'prop'})

    let numOfRuns = 0
    observe(() => {
        data = dynamicObj.prop
        numOfRuns++
    })

    t.true(numOfRuns === 0)
    t.true(data === '')

    return Promise.resolve()
        .then(() => {
            t.true(numOfRuns === 1)
            t.true(data === 'prop')
        })
        .then(() => {
            dynamicObj.prop = 'new prop'
        })
        .then(() => {
            t.true(numOfRuns === 2)
            t.true(data === 'new prop')
        })
})

test('should rerun maximum once per stack', t => {
    let data = 0
    const dynamicObj = observable({prop1: 0, prop2: 0})

    let numOfRuns = 0

    function test() {
        data = dynamicObj.prop1 + dynamicObj.prop2
        numOfRuns++
    }

    observe(test)

    return Promise.resolve()
        .then(() => {
            t.true(numOfRuns === 1)
            t.true(data === 0)
        })
        .then(() => {
            dynamicObj.prop1 = 1
            dynamicObj.prop2 = 3
            dynamicObj.prop1 = 2
        })
        .then(() => {
            t.true(numOfRuns === 2)
            t.true(data === 5)
        })
})

test('should avoid infinite loops', t => {
    const dynamicObj1 = observable({prop: 'value1'})
    const dynamicObj2 = observable({prop: 'value2'})

    let numOfRuns1 = 0
    let numOfRuns2 = 0

    function test1() {
        dynamicObj1.prop = dynamicObj2.prop
        numOfRuns1++
    }

    function test2() {
        dynamicObj2.prop = dynamicObj1.prop
        numOfRuns2++
    }

    observe(test1)
    observe(test2)

    return Promise.resolve()
        .then(() => dynamicObj1.prop = 'Hello')
        .then(() => t.true(dynamicObj2.prop === 'Hello'))
        .then(() => dynamicObj1.prop = 'World!')
        .then(() => t.true(dynamicObj2.prop === 'World!'))
        .then(() => {
            t.true(numOfRuns1 === 3)
            t.true(numOfRuns2 === 3)
        })
})

test('should accept a list of arguments and set the observer arguments to them', t => {
    let data = 0
    const dynamicObj1 = observable({counter: 0})
    const dynamicObj2 = observable({counter: 0})
    observe(setdata, dynamicObj1, dynamicObj2)

    function setdata(state1: any, state2: any) {
        data = state1.counter + state2.counter
    }

    return Promise.resolve()
        .then(() => dynamicObj1.counter = 2)
        .then(() => t.true(data === 2))
        .then(() => dynamicObj2.counter = 1)
        .then(() => t.true(data === 3))
})

test('should return an unobserve (object) signal', t => {
    let data = 0
    const dynamicObj = observable({counter: 0})
    const signal = observe(() => data = dynamicObj.counter)
    t.true(typeof signal === 'object')
})

/**
 * set
 */

test('should observe mutations', t => {
    let data: boolean
    const dynamicObj = observable(new Set())
    observe(() => data = dynamicObj.has('value'))

    return Promise.resolve()
        .then(() => t.false(data))
        .then(() => dynamicObj.add('value'))
        .then(() => t.true(data))
        .then(() => dynamicObj.delete('value'))
        .then(() => t.false(data))
})

test('should observe iteration', t => {
    let data: number
    const dynamicObj = observable(new Set())
    observe(() => {
        data = 0
        for (let num of dynamicObj) {
            data += num
        }
    })

    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => dynamicObj.add(3))
        .then(() => t.true(data === 3))
        .then(() => dynamicObj.add(2))
        .then(() => t.true(data === 5))
        .then(() => dynamicObj.delete(2))
        .then(() => t.true(data === 3))
        .then(() => dynamicObj.clear())
        .then(() => t.true(data === 0))
})

test('should not observe non value changing mutations', t => {
    let data: boolean
    let numOfRuns = 0
    const dynamicObj = observable(new Set())
    observe(() => {
        numOfRuns++
        data = dynamicObj.has('value')
    })

    return Promise.resolve()
        .then(() => {
            t.false(data)
            t.true(numOfRuns === 1)
        })
        .then(() => dynamicObj.add('value'))
        .then(() => dynamicObj.add('value'))
        .then(() => {
            t.true(data)
            t.true(numOfRuns === 2)
        })
        .then(() => dynamicObj.delete('value'))
        .then(() => dynamicObj.delete('value'))
        .then(() => {
            t.false(data)
            t.true(numOfRuns === 3)
        })
})

/**
 * WeakSet
 */

test('should observe mutations', t => {
    let data: boolean
    const value = {}
    const dynamicObj = observable(new Set())
    observe(() => data = dynamicObj.has(value))

    return Promise.resolve()
        .then(() => t.false(data))
        .then(() => dynamicObj.add(value))
        .then(() => t.true(data))
        .then(() => dynamicObj.delete(value))
        .then(() => t.false(data))
})

/**
 * WeakSet
 */

test('should observe mutations', t => {
    let data: boolean
    const value = {}
    const dynamicObj = observable(new Set())
    observe(() => data = dynamicObj.has(value))

    return Promise.resolve()
        .then(() => t.false(data))
        .then(() => dynamicObj.add(value))
        .then(() => t.true(data))
        .then(() => dynamicObj.delete(value))
        .then(() => t.false(data))
})

test('should not observe non value changing mutations', t => {
    let data: boolean
    const value = {}
    let numOfRuns = 0
    const dynamicObj = observable(new Set())
    observe(() => {
        numOfRuns++
        data = dynamicObj.has(value)
    })

    return Promise.resolve()
        .then(() => {
            t.false(data)
            t.true(numOfRuns === 1)
        })
        .then(() => dynamicObj.add(value))
        .then(() => dynamicObj.add(value))
        .then(() => {
            t.true(data)
            t.true(numOfRuns === 2)
        })
        .then(() => dynamicObj.delete(value))
        .then(() => dynamicObj.delete(value))
        .then(() => {
            t.false(data)
            t.true(numOfRuns === 3)
        })
})

/**
 * Map
 */

test('should observe mutations', t => {
    let data: string
    const dynamicObj = observable(new Map())
    observe(() => data = dynamicObj.get('key'))

    return Promise.resolve()
        .then(() => t.true(data === undefined))
        .then(() => dynamicObj.set('key', 'value'))
        .then(() => t.true(data === 'value'))
        .then(() => dynamicObj.delete('key'))
        .then(() => t.true(data === undefined))
})

test('should observe iteration', t => {
    let data: number
    const dynamicObj = observable(new Map())
    observe(() => {
        data = 0
        for (let [key, num] of dynamicObj) {
            data += num
        }
    })

    return Promise.resolve()
        .then(() => t.true(data === 0))
        .then(() => dynamicObj.set('key0', 3))
        .then(() => t.true(data === 3))
        .then(() => dynamicObj.set('key1', 2))
        .then(() => t.true(data === 5))
        .then(() => dynamicObj.delete('key0'))
        .then(() => t.true(data === 2))
        .then(() => dynamicObj.clear())
        .then(() => t.true(data === 0))
})

test('should not observe non value changing mutations', t => {
    let data: string
    let numOfRuns = 0
    const dynamicObj = observable(new Map())
    observe(() => {
        numOfRuns++
        data = dynamicObj.get('key')
    })

    return Promise.resolve()
        .then(() => {
            t.true(data === undefined)
            t.true(numOfRuns === 1)
        })
        .then(() => dynamicObj.set('key', 'value'))
        .then(() => dynamicObj.set('key', 'value'))
        .then(() => {
            t.true(data === 'value')
            t.true(numOfRuns === 2)
        })
        .then(() => dynamicObj.delete('key'))
        .then(() => dynamicObj.delete('key'))
        .then(() => {
            t.true(data === undefined)
            t.true(numOfRuns === 3)
        })
})

/**
 * WeakMap
 */

test('should observe mutations', t => {
    let data: string
    const key = {}
    const dynamicObj = observable(new WeakMap())
    observe(() => data = dynamicObj.get(key))

    return Promise.resolve()
        .then(() => t.true(data === undefined))
        .then(() => dynamicObj.set(key, 'value'))
        .then(() => t.true(data === 'value'))
        .then(() => dynamicObj.delete(key))
        .then(() => t.true(data === undefined))
})

test('should not observe non value changing mutations', t => {
    let data: string
    let numOfRuns = 0
    const key = {}
    const dynamicObj = observable(new WeakMap())
    observe(() => {
        numOfRuns++
        data = dynamicObj.get(key)
    })

    return Promise.resolve()
        .then(() => {
            t.true(data === undefined)
            t.true(numOfRuns === 1)
        })
        .then(() => dynamicObj.set(key, 'value'))
        .then(() => dynamicObj.set(key, 'value'))
        .then(() => {
            t.true(data === 'value')
            t.true(numOfRuns === 2)
        })
        .then(() => dynamicObj.delete(key))
        .then(() => dynamicObj.delete(key))
        .then(() => {
            t.true(data === undefined)
            t.true(numOfRuns === 3)
        })
})

/**
 * execution order
 */
test('should run in registration order the first time', t => {
    let data = ''
    const dynamicObj = observable({prop1: 'prop1', prop2: 'prop2', prop3: 'prop3'})

    observe(() => data += dynamicObj.prop1)
    observe(() => data += dynamicObj.prop2)
    observe(() => data += dynamicObj.prop3)

    dynamicObj.prop3 = 'p3'
    dynamicObj.prop1 = 'p1'
    dynamicObj.prop2 = 'p2'

    return Promise.resolve()
        .then(() => t.true(data === 'p1p2p3'))
})

/**
 * unqueue
 */

test('should remove the observed function from the queue', t => {
    let data: number
    const dynamicObj = observable({prop: 0})

    let numOfRuns = 0

    function test() {
        data = dynamicObj.prop
        numOfRuns++
    }

    const signal = observe(test)

    return Promise.resolve()
        .then(() => {
            dynamicObj.prop = 2
            signal.unqueue()
        })
        .then(() => t.true(numOfRuns === 1))
})

/**
 * unobserve
 */

test('should unobserve the observed function', t => {
    let data = ''
    const dynamicObj = observable({prop: ''})

    let numOfRuns = 0

    function test() {
        data = dynamicObj.prop
        numOfRuns++
    }

    const signal = observe(test)

    return Promise.resolve()
        .then(() => dynamicObj.prop = 'Hello')
        .then(() => signal.unobserve())
        .then(() => {
            t.true(signal.callback === undefined)
            t.true(signal.proxies === undefined)
            t.true(signal.observedKeys === undefined)
        })
        .then(() => dynamicObj.prop = 'World')
        .then(() => dynamicObj.prop = '!')
        .then(() => t.true(numOfRuns === 2))
})

test('should unobserve even if the function is registered for the stack', t => {
    let data: number
    const dynamicObj = observable({prop: 0})

    let numOfRuns = 0

    function test() {
        data = dynamicObj.prop
        numOfRuns++
    }

    const signal = observe(test)

    return Promise.resolve()
        .then(() => {
            dynamicObj.prop = 2
            signal.unobserve()
        })
        .then(() => t.true(numOfRuns === 1))
})

/**
 * extendObservable
 */

test('should observe properties when use extendObservable', t => {
    let data1: number
    let data2: number
    let numOfRuns = 0

    const dynamicObj = observable({
        a: 0,
        b: 1
    })

    const signal = observe(() => {
        data1 = dynamicObj.a
        data2 = dynamicObj.b
        numOfRuns++
    })

    return Promise.resolve()
        .then(() => t.true(numOfRuns === 1))
        .then(() => t.true(data1 === 0))
        .then(() => t.true(data2 === 1))
        .then(() => {
            extendObservable(dynamicObj, {
                a: 1,
                b: 2
            })
        })
        .then(() => t.true(numOfRuns === 2))
        .then(() => t.true(data1 === 1))
        .then(() => t.true(data2 === 2))
})