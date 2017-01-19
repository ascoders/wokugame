import * as React from 'react'
import * as typings from './layout.type'
import {connect} from '../../../frame/index'
import {Link} from 'react-router'

import {Menu, MenuItem, MenuTree} from '../../../components/menu'

const styles = require('./layout.css')

export default connect<Models.Root>(state => {
    return {
        navbarHeight: state.application.navbarHeight
    }
})((props = new typings.Props()) => {
    console.log('layout render', props)
    return (
        <div className={styles.container}>
            <Menu height={props.navbarHeight}>
                <MenuItem>
                    <Link to="/">我酷</Link>
                </MenuItem>
                <MenuItem>
                    <MenuTree title="游戏">
                        <MenuItem>
                            <Link to="/game">飞机大战</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/game">模拟星球</Link>
                        </MenuItem>
                    </MenuTree>
                </MenuItem>

                <MenuItem>
                    <Link to="/login">登录</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/register">注册</Link>
                </MenuItem>
            </Menu>
            {props.children}
        </div>
    )
})