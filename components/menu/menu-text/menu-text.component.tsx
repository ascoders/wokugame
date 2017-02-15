import * as React from 'react'
import * as typings from './menu-text.type'
import {connect} from 'react-redux'
import {IState} from '../reducers'
import {Container} from './menu-text.style'

export default connect<IState,typings.Props>(state => {
    return {
        height: state.height
    }
})((props = new typings.Props()) => {
    return (
        <Container name="woku-menu-item" theme={{ height: props.height }}>
            {props.children}
        </Container>
    )
})