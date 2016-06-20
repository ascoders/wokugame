import * as React from 'react'
import {connect} from 'fit-isomorphic-redux-tools'
import * as defintion from './defintion'

@connect(
    (state: any) => {
        return {
            userStore: state.user.toJS()
        }
    }, {}
)
export default class Login extends React.Component<defintion.PropsInterface,defintion.StateInterface> {
    static defaultProps:defintion.PropsInterface = new defintion.Props()
    public state:defintion.StateInterface = new defintion.State()

    componentWillMount() {

    }

    componentDidMount() {
        document.title = '登录'
    }

    render() {
        return (
            <div className="_namespace">
                登录
            </div>
        )
    }
}