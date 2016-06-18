import * as React from 'react'
import {connect} from 'fit-isomorphic-redux-tools'
import * as userActions from '../../stores/user/action'

@connect(
    (state: any) => {
        return {
            userStore: state.user.toJS()
        }
    },
    userActions
)
export default class LayoutComponent extends React.Component<any, any> {
    state: any = {}
    props: any

    constructor(props: any) {
        super(props)
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render(): any {
        return this.props.children
    }
}