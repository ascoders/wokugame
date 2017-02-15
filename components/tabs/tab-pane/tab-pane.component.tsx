import * as React from 'react'
import * as typings from './tab-pane.type'
import {Container} from './tab-pane.style'

export default class TabPaneComponent extends React.Component<typings.Props, any> {
    static defaultProps = new typings.Props()

    render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        )
    }
}