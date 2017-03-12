import * as React from 'react'
import * as typings from './design.type'
import { Connect } from '../../../../../../../../components/dynamic-react'

import Modal from '../../../../../../../../components/modal'
import Detail from './detail/detail.component'

import { Container } from './design.style'

@Connect
export default class Design extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    state = new typings.State()

    handleClose = () => {
        this.setState({ show: false })
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    render() {
        return (
            <Container onClick={this.handleShow}>
                <Modal show={this.state.show} onClose={this.handleClose} title={`设计 ${this.props.warship.name}`}>
                    {this.state.show &&
                        <Detail warship={this.props.warship} onClose={this.handleClose} />
                    }
                </Modal>

                设计
            </Container>
        )
    }
}