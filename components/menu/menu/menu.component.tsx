import * as React from 'react'
import * as typings from './menu.type'
import {Provider} from 'mobx-react'
import MenuStore from '../stores/index'

import {Container} from './menu.style'

export default class MenuComponent extends React.Component<typings.Props, any> {
    static defaultProps = new typings.Props()

    private Menu: MenuStore

    componentWillMount() {
        this.Menu = new MenuStore()

        if (this.props.height) {
            this.Menu.setHeight(this.props.height)
        }
    }

    render() {
        return (
            <Provider Menu={this.Menu}>
                <Container theme={{ height: this.Menu.store.height }}>
                    {this.props.children}
                </Container>
            </Provider>
        )
    }
}