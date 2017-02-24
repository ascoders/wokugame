import * as React from 'react'
import * as typings from './menu-text.type'

import { Connect } from '../../dynamic-react'
import { Store } from '../store'

import { Container } from './menu-text.style'

export default Connect<{
    store: Store
}>(state => {
    return {
        height: state.store.height
    }
})((props = new typings.Props()) => {
    return (
        <Container name="woku-menu-item" theme={{ height: props.height }}>
            {props.children}
        </Container>
    )
})