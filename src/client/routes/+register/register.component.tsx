import * as React from 'react'
import * as typings from './register.type'
import {connect} from '../../../../frame/index'
const styles = require('./register.css')

export default connect<Models.Root>(state => {
    return {
        navbarHeight: state.application.navbarHeight
    }
})((props = new typings.Props()) => {
    return (
        <div className={styles.container}>

        </div>
    )
})