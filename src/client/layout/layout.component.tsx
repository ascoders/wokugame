import * as React from 'react'
import * as typings from './layout.type'
import {connect} from '../../../frame/index'

import Navbar from '../../../components/navbar/navbar.component'

export default connect<Models.Root>(state => {
    return {
        headerColor: state.application.headerColor
    }
})((props: typings.PropsDefine = new typings.Props()) => {
    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    )
})