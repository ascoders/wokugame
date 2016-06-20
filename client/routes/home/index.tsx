import * as React from 'react'
import {connect} from 'fit-isomorphic-redux-tools'
import * as defintion from './defintion'
import {Link} from 'react-router'

@connect(
    (state: any) => {
        return {
            userStore: state.user.toJS()
        }
    }, {}
)
export default class Home extends React.Component<defintion.PropsInterface,defintion.StateInterface> {
    static defaultProps: defintion.PropsInterface = new defintion.Props()
    public state: defintion.StateInterface = new defintion.State()

    componentWillMount() {

    }

    componentDidMount() {
        document.title = '我酷游戏'
    }

    render() {
        return (
            <div className="_namespace">
                <Link to="/login">登录</Link>
                <Link to="/register">注册</Link>
            </div>
        )
    }
}