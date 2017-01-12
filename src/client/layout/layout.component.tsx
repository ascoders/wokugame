import * as React from 'react'
import * as typings from './layout.type'
import {connect} from '../../../frame/index'
import {Link} from 'react-router'

import {Menu, MenuItem} from '../../../components/menu'

export default connect<Models.Root>(state => {
    return {
        headerColor: state.application.headerColor
    }
})((props: typings.PropsDefine = new typings.Props()) => {
    return (
        <div>
            <Menu>
                <MenuItem>
                    <Link to="/">我酷</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/game">游戏</Link>
                </MenuItem>
            </Menu>
            {props.children}
        </div>
    )
})