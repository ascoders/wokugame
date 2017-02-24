import * as React from 'react'
import * as typings from './layout.type'
import { Link } from 'react-router'
import { Connect } from '../../../components/dynamic-react'
import { Stores } from '../stores'

import { Menu, MenuItem, MenuTree, MenuText } from '../../../components/menu'

import { Container } from './layout.style'

@Connect<Stores>(state => {
    return {
        user: state.UserStore.authenticatedUser
    }
})
export default class LayoutScene extends React.Component<typings.Props, any> {
    static defaultProps = new typings.Props()

    componentWillMount() {
        this.props.actions.UserAction.loginAuthenticatedUser()
    }

    handleLogout = () => {
        this.props.actions.UserAction.loginOut()
    }

    render() {
        return (
            <Container>
                <Menu>
                    <MenuItem>
                        <Link to="/">我酷</Link>
                    </MenuItem>
                    <MenuItem>
                        <MenuTree title="游戏">
                            <MenuItem>
                                <Link to="/game/play-aircraft">飞机大战</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/game/simulated-planet">模拟星球</Link>
                            </MenuItem>
                        </MenuTree>
                    </MenuItem>

                    {!this.props.user
                        ? [
                            <MenuItem key="0">
                                <Link to="/login">登录</Link>
                            </MenuItem>,
                            <MenuItem key="1">
                                <Link to="/register">注册</Link>
                            </MenuItem>
                        ]
                        : <MenuItem>
                            <MenuTree title={this.props.user.nickname}>
                                <MenuItem onClick={this.handleLogout}>
                                    <MenuText>退出</MenuText>
                                </MenuItem>
                            </MenuTree>
                        </MenuItem>
                    }
                </Menu>
                {this.props.children}
            </Container>
        )
    }
}