import * as React from 'react'
import * as typings from './menu-item.type'
import {observer, inject} from 'mobx-react'
import {Container} from './menu-item.style'

export default inject('Menu')(observer((props: typings.Props = new typings.Props()) => {
    return (
        <Container name="woku-menu-item" theme={{ height: props.Menu.store.height }}>
            {props.children}
        </Container>
    )
}))