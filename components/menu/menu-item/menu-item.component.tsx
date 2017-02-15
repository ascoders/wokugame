import * as React from 'react'
import * as typings from './menu-item.type'
import {connect} from 'react-redux'
import {IState} from '../reducers'
import {Container} from './menu-item.style'

export default connect<IState,typings.Props>(state => {
    return {
        height: state.height
    }
})((props = new typings.Props()) => {
    return (
        <Container onClick={props.onClick} name="woku-menu-item" theme={{ height: props.height }}>
            {props.children}
        </Container>
    )
})