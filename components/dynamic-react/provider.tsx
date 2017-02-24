import * as React from 'react'
import { observable } from '../dynamic-object'

interface Props {
    stores: any
    actions: any
}

export default class Provider extends React.Component<Props, any> {

    static contextTypes = {
        dyStores: React.PropTypes.object
    }

    static childContextTypes = {
        dyStores: React.PropTypes.object.isRequired
    }

    getChildContext() {
        // 继承 store
        const stores = Object.assign({}, this.context.dyStores)

        // 添加用户传入的 stores，而且特意允许覆盖继承的 store，保证多层数据流，内层数据流不被干扰
        for (let key in this.props.stores) {
            stores[key] = observable(this.props.stores[key])
        }

        // 添加用户传入的 actions
        for (let key in this.props.actions) {
            const action: any = this.props.actions[key]
            stores[key] = observable(action)

            // 将原对象所有 function 的 this 指向 proxy
            for (let actionKey in action) {
                if (typeof action[actionKey] === 'function') {
                    action[actionKey] = action[actionKey].bind(stores[key])
                }
            }
        }

        return {
            dyStores: stores
        }
    }

    render() {
        return React.Children.only(this.props.children)
    }
}