import * as React from 'react'
import * as typings from './menu.type'
const styles = require('./menu.css')

export default (props: typings.PropsDefine = new typings.Props()) => {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}