import * as React from 'react'
import { Connect } from 'dynamic-react'

import * as typings from './menu-item.type'
import { Container } from './menu-item.style'

export default Connect((props: typings.Props = new typings.Props()) => {
    return (
        <Container onClick={props.onClick} name="woku-menu-item" theme={{ height: props.menuStore.height }}>
            {props.children}
        </Container>
    )
})