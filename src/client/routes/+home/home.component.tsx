import * as React from 'react'
import * as typings from './home.type'
import {observer, inject} from 'mobx-react'

import ArticleBox from '../../../../components/article-box/article-box.component'

import {ArticleContainer, BannerImage} from './home.style'

export default inject('User')(observer((props = new typings.Props()) => {
    return (
        <div>
            <BannerImage/>

            <ArticleContainer>
                <ArticleBox/>
            </ArticleContainer>
        </div>
    )
}))