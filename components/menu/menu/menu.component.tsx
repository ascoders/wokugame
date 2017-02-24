import * as React from 'react'
import * as typings from './menu.type'

import { Provider } from '../../dynamic-react'
import { Container } from '../../dependency-inject'
import { Action, Store } from '../store'

import { ContainerComponent } from './menu.style'

export default class MenuComponent extends React.Component<typings.Props, any> {
    static defaultProps = new typings.Props()

    private store: Store
    private action: Action

    componentWillMount() {
        const container = new Container()
        container.set(Store, new Store())
        container.set(Action, new Action())

        this.store = container.get(Store)
        this.action = container.get(Action)

        if (this.props.height) {
            this.action.setHeight(this.props.height)
        }
    }

    render() {
        return (
            <Provider stores={{ store: this.store }} actions={{ action: this.action }}>
                <ContainerComponent theme={{ height: this.store.height }}>
                    {this.props.children}
                </ContainerComponent>
            </Provider>
        )
    }
}