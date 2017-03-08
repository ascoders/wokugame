import * as React from 'react'
import * as typings from './warship.type'
import {airships} from '../../../../../../common/game-simulated-planet'

import {Connect} from '../../../../../../../components/dynamic-react'
import Tooltip from '../../../../../../../components/tooltip'

import {
    Container, Title, LeftContainer, RightContainer, AirshipCategory, NoDrawingContainer, AirshipContainer,
    AirshipContent, AirshipContentLeft, AirshipContentRight, DesignButton
} from './warship.style'

export default Connect((props: typings.Props = new typings.Props()) => {
    // 循环显示
    const Drawing = airships.map((airshipCategory, index) => {
        const Drawings = airshipCategory.children.map((airship, childIndex) => {
            return (
                <AirshipContent key={childIndex}>
                    <AirshipContentLeft>
                        {airship.name} 护盾：{airship.shield} 耐久：{airship.hp} 空间：{airship.size}
                    </AirshipContentLeft>
                    <AirshipContentRight>
                        <DesignButton>设计</DesignButton>
                    </AirshipContentRight>
                </AirshipContent>
            )
        })

        return (
            <AirshipContainer key={index}>
                <Tooltip title={airshipCategory.description}>
                    <AirshipCategory>
                        {airshipCategory.name}
                    </AirshipCategory>
                </Tooltip>
                {Drawings.length === 0 ?
                    <NoDrawingContainer>还未拥有图纸</NoDrawingContainer>:
                    Drawings
                }
            </AirshipContainer>
        )
    })

    return (
        <Container>
            <LeftContainer>
                <Title>
                    图纸
                </Title>

                {Drawing}
            </LeftContainer>

            <RightContainer>
                <Title>
                    生产
                </Title>
            </RightContainer>
        </Container>
    )
})