import * as React from 'react'
import * as typings from './input.type'
const styles = require('./input.css')

export default class Input extends React.Component<typings.Props, typings.State> {
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
        const containerStyle = Object.assign({}, {
            zIndex: this.state.focus ? 1 : 0
        }, this.props.style)

        return (
            <label className={styles.container} style={containerStyle}>
                {/** 文案 */}
                {this.props.label !== null &&
                <span className={styles.label}>{this.props.label}</span>
                }

                <div className={styles.inputContainer}>
                    {/** 输入框 */}
                    <input className={styles.inputField}
                           value={this.props.value}
                           defaultValue={this.props.defaultValue}
                           onFocus={this.handleFocus}
                           onBlur={this.handleBlur}
                           onChange={this.props.onChange}/>

                    {/** 阴影特效 */}
                    <span className={styles.shadow}/>
                </div>
            </label>
        )
    }
}