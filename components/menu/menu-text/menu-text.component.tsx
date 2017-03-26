import * as React from 'react'
import { Connect } from 'dynamic-react'

import * as typings from './menu-text.type'
import { Container } from './menu-text.style'

export default Connect((props: typings.Props = new typings.Props()) => {
    return (
        <Container name="woku-menu-item" theme={{ height: props.menuStore.height }}>
            {props.children}
        </Container>
    )
})