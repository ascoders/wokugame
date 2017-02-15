import * as React from 'react'
import * as typings from './linear.type'
import {Container, Progress} from './linear.style'

export default class Linear extends React.Component<typings.Props,any> {
    static defaultProps = new typings.Props()

    render() {
        return (
            <Container theme={{height: this.props.height}}>
                <Progress theme={{value:this.props.progress, height: this.props.height}}
                          style={{width: `${this.props.progress}%`}}/>
            </Container>
        )
    }
}