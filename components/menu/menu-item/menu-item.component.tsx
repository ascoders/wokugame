import * as React from 'react'
import * as typings from './menu-item.type'
import {connect} from 'react-redux'
import {IState} from '../reducers'
const styles = require('./menu-item.css')

export default connect<IState>(state => {
    return {
        height: state.height
    }
})((props = new typings.Props()) => {
    return (
        <div className={styles.container} name="woku-menu-item" style={{height:props.height}}>
            {props.children}
        </div>
    )
})