import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './modal.type'

import {Container, ModalContainer, ModalContent, ModalHeader, ModalTitle, ModalBody, CloseButton} from './modal.style'

export default class InputComponent extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    public state = new typings.State()

    private modalDom: HTMLElement

    componentDidMount() {
        // 在 body 生成 modal
        this.modalDom = document.createElement('div')
        document.body.appendChild(this.modalDom)
        this.renderModalDom()
    }

    componentDidUpdate() {
        this.renderModalDom()
    }

    componentWillUnmount() {
        document.body.removeChild(this.modalDom)
    }

    /**
     * 最外层被点击
     */
    handleOutClick = () => {
        if (!this.props.backdropClickToClose)return
        this.props.onClose()
    }

    /**
     * 模态框内点击终止冒泡
     * @param event
     */
    handleModalClick = (event: TouchEvent) => {
        event.stopPropagation()
    }

    /**
     * 渲染模态框
     */
    renderModalDom() {
        const ModalElement = (
            <Container onClick={this.handleOutClick.bind(this)} tabIndex={-1} theme={{show:this.props.show}}>
                <ModalContainer onClick={this.handleModalClick.bind(this)}>
                    <ModalContent>
                        {this.props.title === null ? null :
                            <ModalHeader>
                                <ModalTitle>{this.props.title}</ModalTitle>
                                <button type="button"
                                        className="close">
                                    <CloseButton onClick={this.props.onClose}>×</CloseButton>
                                </button>
                            </ModalHeader>
                        }
                        <ModalBody>
                            {this.props.children}
                        </ModalBody>
                    </ModalContent>
                </ModalContainer>
            </Container>
        )

        ReactDOM.render(ModalElement, this.modalDom)
    }

    render() {
        return null as any
    }
}