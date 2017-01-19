import * as React from 'react'
import * as typings from './menu-tree.type'
import {connect} from 'react-redux'
import {IState} from '../reducers'
const styles = require('./menu-tree.css')

export default connect<IState>(state => {
    return {
        height: state.height
    }
})((props = new typings.Props()) => {
    return (
        <div className={styles.container} name="woku-menu-item" style={{height:props.height}}>
            {typeof props.title === 'string'
                ? props.title
                : props.title()}

            <div className={styles.treeItem} name="woku-menu-subtree" style={{top:props.height}}>
                {props.children}
            </div>
        </div>
    )
})