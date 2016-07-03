import * as React from 'react'
import connect from 'fit-isomorphic-redux-tools/lib/connect'
import * as userActions from '../../stores/user/action'
import * as defintion from './defintion'

@connect(
    (state: any) => {
        return {
            userStore: state.user.toJS()
        }
    },
    userActions
)
export default class LayoutComponent extends React.Component<defintion.PropsInterface,defintion.StateInterface> {
    static defaultProps: defintion.PropsInterface = new defintion.Props()
    public state: defintion.StateInterface = new defintion.State()
    
    render(): any {
        return this.props.children
    }
}