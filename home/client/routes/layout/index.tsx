import * as React from 'react'
import {connect} from 'fit-isomorphic-redux-tools'
import * as userActions from '../../stores/user/action'
import {basename} from '../../config'

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
        this.props.userStore.simpleGet || this.props.simpleGet()
        this.props.userStore.simplePost || this.props.simplePost()
    }

    componentDidMount() {

    }

    render(): any {
        return this.props.children
    }
}