import * as React from 'react'
import RoutesBase from '../../components/routes-base'
import connect from 'fit-isomorphic-redux-tools/lib/connect'
import * as defintion from './defintion'
import {Link} from 'react-router'

@connect(
    (state: any) => {
        return {
            userStore: state.user.toJS()
        }
    }, {}
)
export default class Home extends RoutesBase<defintion.PropsInterface,defintion.StateInterface> {
    static defaultProps: defintion.PropsInterface = new defintion.Props()
    public state: defintion.StateInterface = new defintion.State()
    public static title: string = '我酷游戏'

    getTitle() {
        return Home.title
    }

    componentWillMount() {

    }

    componentDidMount() {

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