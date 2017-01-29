import * as React from 'react'
import * as typings from './menu-tree.type'
import {observer, inject} from 'mobx-react'
import {Container, TreeItem} from './menu-tree.style'

export default inject('Menu')(observer((props: typings.Props = new typings.Props()) => {
    return (
        <Container theme={{ height: props.Menu.store.height }} name="woku-menu-tree">
            {typeof props.title === 'string'
                ? props.title
                : props.title()}

            <TreeItem name="woku-menu-subtree" theme={{ top: props.Menu.store.height }}>
                {props.children}
            </TreeItem>
        </Container>
    )
}))