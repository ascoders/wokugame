import * as React from 'react'
import * as typings from './menu-tree.type'
import {connect} from 'react-redux'
import {IState} from '../reducers'
import {Container, TreeItem} from './menu-tree.style'

export default connect<IState,typings.Props>(state => {
    return {
        height: state.height
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