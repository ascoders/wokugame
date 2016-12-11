import * as React from 'react'
import * as typings from './home.type'

export default class Home extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        return (
            <div>home</div>
        )
    }
}