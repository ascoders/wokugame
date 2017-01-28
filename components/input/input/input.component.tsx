import * as React from 'react'
import * as typings from './input.type'

import { LabelContainer, Label, InputContainer, Shadow, Input } from './input.style'

export default class InputComponent extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    public state = new typings.State()

    handleFocus = () => {
        this.setState({
            focus: true
        })
    }

    handleBlur = () => {
        this.setState({
            focus: false
        })
    }

    render() {
        return (
            <LabelContainer theme={{ focus: this.state.focus }}>
                {/** 文案 */}
                {this.props.label !== null &&
                    <Label>{this.props.label}</Label>
                }

                <InputContainer>
                    {/** 输入框 */}
                    <Input value={this.props.value}
                        defaultValue={this.props.defaultValue}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.props.onChange} />

                    {/** 阴影特效 */}
                    <Shadow name="woku-input-shadow" />
                </InputContainer>
            </LabelContainer>
        )
    }
}