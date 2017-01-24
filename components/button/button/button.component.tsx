import * as React from 'react'
import * as typings from './button.type'
const styles = require('./button.css')

export default (props = new typings.Props()) => {
    return (
        <div onClick={props.onclick} className={styles.container}>
            {props.children}
        </div>
    )
}