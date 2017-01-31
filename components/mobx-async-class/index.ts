import {action} from 'mobx'

export default (errorHandler?: (error?: Error) => void) => <T extends Function>(target: T): T => {
    const keys = Object.getOwnPropertyNames(target.prototype)

    keys.forEach(key => {
        // 将所有 action 包上 try catch
        // console.log(target.prototype[key].prototype)
        if (target.prototype[key].prototype && target.prototype[key].prototype.constructor.isMobxAction) {
            const func = target.prototype[key]
            target.prototype[key] = async(...args: any[]) => {
                try {
                    await func.apply(this, args)
                } catch (error) {
                    errorHandler && errorHandler(error)
                }
            }
        }
    })

    return target
}

export const asyncMethod = <T extends Function>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
    const func = action(descriptor.value)

    return {
        configurable: true,

        get() {
            return (...args: any[]) => {
                return Promise.resolve(func.apply(this, args)).catch(error => {
                    console.log(error)
                })
            }
        },

        set(newValue: any){
            return newValue
        }
    }
}