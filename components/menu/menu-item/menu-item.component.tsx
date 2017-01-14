import * as React from 'react'
import * as typings from './menu-item.type'
const styles = require('./menu-item.css')

export default (props: typings.PropsDefine = new typings.Props()) => {
    return (
        <div className={styles.container} name="woku-menu-item">
            {props.children}
        </div>
    )
}