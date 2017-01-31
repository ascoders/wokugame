import * as React from 'react'
import * as typings from './menu-text.type'
import {observer, inject} from 'mobx-react'
import {Container} from './menu-text.style'

export default inject('Menu')(observer((props: typings.Props = new typings.Props()) => {
    return (
        <Container name="woku-menu-item" theme={{ height: props.Menu.store.height }}>
            {props.children}
        </Container>
    )
}))