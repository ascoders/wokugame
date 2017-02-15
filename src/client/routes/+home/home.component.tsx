import * as React from 'react'
import * as typings from './home.type'
import {connect} from '../../../../components/reax'
import {State, Actions} from '../../models'

import ArticleBox from '../../../../components/article-box/article-box.component'

import {ArticleContainer, BannerImage} from './home.style'

export default connect<State,typings.Props>(state => {
    return {}
}, dispatch => {
    return {
        actions: new Actions(dispatch)
    }
})((props = new typings.Props()) => {
    return (
        <div>
            <BannerImage/>

            <ArticleContainer>
                <ArticleBox/>
            </ArticleContainer>
        </div>
    )
})