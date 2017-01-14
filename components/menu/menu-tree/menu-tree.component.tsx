import * as React from 'react'
import * as typings from './menu-tree.type'
const styles = require('./menu-tree.css')

export default (props = new typings.Props()) => {
    return (
        <div className={styles.container} name="woku-menu-item">
            {typeof props.title === 'string'
                ? props.title
                : props.title()}

            <div className={styles.treeItem} name="woku-menu-subtree">
                {props.children}
            </div>
        </div>
    )
}