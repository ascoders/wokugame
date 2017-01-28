import * as React from 'react'
import * as typings from './article-box.type'

import {
    Container,
    LeftContainer,
    RightContainer,
    CategoryContainer,
    TitleContainer,
    OtherContainer
} from './article-box.style'

export default (props = new typings.Props()) => {
    return (
        <Container>
            <LeftContainer>
                <CategoryContainer>
                    类别
                </CategoryContainer>

                <TitleContainer>
                    标题
                </TitleContainer>

                <OtherContainer>
                    日期
                </OtherContainer>
            </LeftContainer>

            <RightContainer></RightContainer>
        </Container>
    )
}