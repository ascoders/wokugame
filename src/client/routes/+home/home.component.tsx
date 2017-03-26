import * as React from 'react'
import * as typings from './home.type'
import { Connect } from 'dynamic-react'

import ArticleBox from '../../../../components/article-box/article-box.component'

import { Container, ArticleContainer, BannerImage } from './home.style'

export default (props = new typings.Props()) => {
    return (
        <Container>
            <ArticleContainer>
                <ArticleBox />
            </ArticleContainer>
        </Container>
    )
}