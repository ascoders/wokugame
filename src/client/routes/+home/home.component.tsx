import * as React from 'react'
import * as typings from './home.type'
import {connect} from '../../../../frame/index'
const styles = require('./home.css')

import ArticleBox from '../../../../components/article-box/article-box.component'

export default connect<Models.Root>(state => {
    return {}
})((props = new typings.Props()) => {
    console.log('home render')

    const handleClick = () => {
        props.dispatch({
            type: 'application/changeHeaderColor',
            payload: '123556'
        })
    }

    return (
        <div>
            <div className={styles.bannerImage}/>

            <div className={styles.articleContainer}>
                <ArticleBox/>
            </div>
        </div>
    )
})