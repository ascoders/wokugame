import * as React from 'react'
import { Provider } from 'dynamic-react'

import * as typings from './menu.type'
import { StoreProps } from '../store'
import { ContainerComponent } from './menu.style'

export default class MenuComponent extends React.Component<typings.Props, any> {
    static defaultProps = new typings.Props()

    private storeProps = new StoreProps()

    componentWillMount() {
        if (this.props.height) {
            this.storeProps.menuAction.setHeight(this.props.height)
        }
    }

    render() {
        return (
            <Provider {...this.storeProps}>
                <ContainerComponent theme={{ height: this.storeProps.menuStore.height }}>
                    {this.props.children}
                </ContainerComponent>
            </Provider>
        )
    }
}