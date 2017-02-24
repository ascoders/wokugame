// import {action} from 'mobx'
//
// export default (errorHandler?: (error?: Error) => void) => <T extends Function>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
//     const func = action(descriptor.value)
//
//     return {
//         configurable: true,
//
//         get() {
//             return (...args: any[]) => {
//                 return Promise.resolve(func.apply(this, args)).catch(error => {
//                     if (errorHandler) {
//                         return errorHandler(error)
//                     }
//                 })
//             }
//         },
//
//         set(newValue: any){
//             return newValue
//         }
//     }
// }