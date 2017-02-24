import * as React from 'react'
import * as typings from './menu-tree.type'

import { Connect } from '../../dynamic-react'
import { Store } from '../store'

import { Container, TreeItem } from './menu-tree.style'

export default Connect<{
    store: Store
}>(state => {
    return {
        height: state.store.height
    }
})((props = new typings.Props()) => {
    return (
        <Container theme={{ height: props.height }} name="woku-menu-tree">
            {typeof props.title === 'string'
                ? props.title
                : props.title()}

            <TreeItem name="woku-menu-subtree" theme={{ top: props.height }}>
                {props.children}
            </TreeItem>
        </Container>
    )
})