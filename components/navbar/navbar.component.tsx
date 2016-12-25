import * as React from 'react'
import * as typings from './navbar.type'
const styles = require('./navbar.css')

export default (props: typings.PropsDefine = new typings.Props()) => {
    return (
        <div className={styles.container}>
            navbar
        </div>
    )
}