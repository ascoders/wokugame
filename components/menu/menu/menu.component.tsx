import * as React from 'react'
import * as typings from './menu.type'
import {Provider} from 'mobx-react'
import MenuStore from '../stores/index'

import {Container} from './menu.style'

export default class Menu extends React.Component<typings.Props, any> {
    static defaultProps = new typings.Props()

    private menu: MenuStore

    componentWillMount() {
        this.menu = new MenuStore()

        if (this.props.height) {
            this.menu.setHeight(this.props.height)
        }
    }

    render() {
        return (
            <Provider menu={this.menu}>
                <Container theme={{ height: this.menu.store.height }}>
                    {this.props.children}
                </Container>
            </Provider>
        )
    }
}