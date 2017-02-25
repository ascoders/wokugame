import * as React from 'react'
import * as typings from './menu-tree.type'

import { Connect } from '../../dynamic-react'

import { Container, TreeItem } from './menu-tree.style'

export default Connect((props: typings.Props = new typings.Props()) => {
    return (
        <Container theme={{ height: props.menuStore.height }} name="woku-menu-tree">
            {typeof props.title === 'string'
                ? props.title
                : props.title()}

            <TreeItem name="woku-menu-subtree" theme={{ top: props.menuStore.height }}>
                {props.children}
            </TreeItem>
        </Container>
    )
})