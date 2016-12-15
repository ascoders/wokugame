import * as React from 'react'
import * as typings from './home.type'
import {connect} from 'react-redux'
import TestComponent from './test/home.component'

import * as ApplicationAction from '../../../actions/application'

const Home = (props: typings.PropsDefine = new typings.Props()) => (
    <div>
        {props.headerColor}
        <button onClick={props.locationChange}>click</button>
        <TestComponent/>
    </div>
)

export default connect(state => {
    return {
        headerColor: state.application.headerColor
    }
}, dispatch => {
    return {
        locationChange: () => {
            dispatch(ApplicationAction.locationChange('aaa'))
        }
    }
})(Home)