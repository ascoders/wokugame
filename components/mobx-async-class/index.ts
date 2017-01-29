export default (errorHandler?: (error?: Error) => void) => <T extends Function>(target: T): T => {
    let keys = Object.getOwnPropertyNames(target.prototype)

    keys.forEach(key => {
        // 将所有 action 包上 try catch
        console.log(key)
        console.log(target.prototype)
        //if (target.prototype[key].prototype && target.prototype[key].prototype.constructor.isMobxAction) {
        // const func = target.prototype[key]
        // target.prototype[key] = async(...args: any[]) => {
        //     try {
        //         await func.apply(this, args)
        //     } catch (error) {
        //         errorHandler && errorHandler(error)
        //     }
        // }
        //}
    })

    return target
}