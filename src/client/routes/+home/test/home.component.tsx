import * as React from 'react'
import * as typings from './home.type'
import {connect} from 'react-redux'

const Home = (props: typings.PropsDefine = new typings.Props()) => {
    return (
        <div>
            555
        </div>
    )
}

export default connect(state => {
    return {}
}, dispatch => {
    return {}
})(Home)