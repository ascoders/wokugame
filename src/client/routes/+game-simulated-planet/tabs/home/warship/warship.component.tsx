import * as React from 'react'
import * as typings from './warship.type'
import { warshipList, putOnEquipment } from '../../../../../../common/game-simulated-planet'

import { Connect } from '../../../../../../../components/dynamic-react'
import Tooltip from '../../../../../../../components/tooltip'

import Design from './design/design.component'

import {
    Container, Title, LeftContainer, RightContainer, AirshipCategory, NoDrawingContainer, AirshipContainer,
    AirshipContent, AirshipContentLeft, AirshipContentRight
} from './warship.style'

import DesignedWarship from './designed-warship/designed-warship.component'

@Connect
export default class Warship extends React.Component<typings.Props, typings.State> {
    componentWillMount() {
        // 查询所有飞船设计图
        this.props.GameSimulatedPlanetAction.getDesignWarship(this.props.GameSimulatedPlanetStore.currentPlanet.id)
    }

    render() {
        // 所有飞船图纸
        const Drawing = warshipList.map((warshipCategory, index) => {
            const Drawings = warshipCategory.children.map((warship, childIndex) => {
                return (
                    <AirshipContent key={childIndex}>
                        <AirshipContentLeft>
                            {warship.name} 护盾：{warship.shield} 耐久：{warship.hp} 空间：{warship.size}
                        </AirshipContentLeft>
                        <AirshipContentRight>
                            <Design warship={warship} />
                        </AirshipContentRight>
                    </AirshipContent>
                )
            })

            return (
                <AirshipContainer key={index}>
                    <Tooltip title={warshipCategory.description}>
                        <AirshipCategory>
                            {warshipCategory.name}
                        </AirshipCategory>
                    </Tooltip>
                    {Drawings.length === 0 ?
                        <NoDrawingContainer>还未拥有图纸</NoDrawingContainer> :
                        Drawings
                    }
                </AirshipContainer>
            )
        })

        // 所有设计好的飞船
        const designedWarships = this.props.GameSimulatedPlanetStore.designedWarships
            .get(this.props.GameSimulatedPlanetStore.currentPlanet.id)
        console.log('aa?')
        const DesignedWarshipsElement = designedWarships && designedWarships.reverse().map((designedWarship, index) => {
            return (
                <DesignedWarship key={index} designedWarship={designedWarship} />
            )
        })

        return (
            <Container>
                <LeftContainer>
                    <Title>
                        战舰原型
                    </Title>
                    {Drawing}
                </LeftContainer>

                <RightContainer>
                    <Title>
                        生产
                    </Title>
                    <div>生产队列</div>
                    <div>10级解锁</div>
                    {DesignedWarshipsElement}
                </RightContainer>
            </Container>
        )
    }
}