import * as React from 'react'
import * as typings from './layout.type'
import {connect} from '../../../frame/index'
import {Link} from 'react-router'

import {Menu, MenuItem, MenuTree} from '../../../components/menu'

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
                    <MenuTree title="游戏">
                        <Link to="/game">飞机大战</Link>
                        <Link to="/game">模拟星球</Link>
                    </MenuTree>
                </MenuItem>
            </Menu>
            {props.children}
        </div>
    )
})