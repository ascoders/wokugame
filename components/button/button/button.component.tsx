import * as React from 'react'
import * as typings from './button.type'
import { Container } from './button.style'

export default (props = new typings.Props()) => {
    return (
        <Container onClick={props.onclick}>
            {props.children}
        </Container>
    )
}