import * as React from 'react'
import * as typings from './layout.type'
import {connect} from '../../../frame/index'

import Menu from '../../../components/menu/menu.component'

export default connect<Models.Root>(state => {
    return {
        headerColor: state.application.headerColor
    }
})((props: typings.PropsDefine = new typings.Props()) => {
    return (
        <div>
            <Menu></Menu>
            {props.children}
        </div>
    )
})