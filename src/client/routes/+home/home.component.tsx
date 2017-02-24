import * as React from 'react'
import * as typings from './home.type'
import { Connect } from '../../../../components/dynamic-react'
import { Stores } from '../../stores'

import ArticleBox from '../../../../components/article-box/article-box.component'

import { ArticleContainer, BannerImage } from './home.style'

export default Connect<Stores>(state => {
    return {}
})((props = new typings.Props()) => {
    return (
        <div>
            <ArticleContainer>
                <ArticleBox />
            </ArticleContainer>
        </div>
    )
})