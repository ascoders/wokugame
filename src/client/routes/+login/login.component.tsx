import * as React from 'react'
import * as typings from './login.type'
import {connect} from '../../../../frame/index'
const styles = require('./login.css')

export default connect<Models.Root>(state => {
    return {}
})((props = new typings.Props()) => {
    return (
        <div>
            <div className={styles.bannerImage}/>

            <div className={styles.articleContainer}>

            </div>
        </div>
    )
})