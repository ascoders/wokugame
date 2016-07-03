import * as React from 'react'
import RoutesBase from '../../components/routes-base'
import connect from 'fit-isomorphic-redux-tools/lib/connect'
import * as defintion from './defintion'

@connect(
    (state: any) => {
        return {
            userStore: state.user.toJS()
        }
    }, {}
)
export default class Login extends RoutesBase<defintion.PropsInterface,defintion.StateInterface> {
    static defaultProps:defintion.PropsInterface = new defintion.Props()
    public state:defintion.StateInterface = new defintion.State()
    public static title: string = '登录 - 我酷游戏'

    getTitle() {
        return Login.title
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="_namespace">
                登录
            </div>
        )
    }
}