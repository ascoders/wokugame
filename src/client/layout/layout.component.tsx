import * as React from 'react'
import * as typings from './layout.type'
import {Link} from 'react-router'

import {Menu, MenuItem, MenuTree} from '../../../components/menu'

import {Container} from './layout.style'

let MobxReactDevtools: any
if (process.env.NODE_ENV !== 'production') {
    MobxReactDevtools = require('mobx-react-devtools').default
}

export default (props = new typings.Props()) => {
    return (
        <Container>
            <Menu>
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

            {process.env.NODE_ENV !== 'production' &&
            <MobxReactDevtools position={{ left: 0, bottom: 0 }}/>}
        </Container>
    )
}