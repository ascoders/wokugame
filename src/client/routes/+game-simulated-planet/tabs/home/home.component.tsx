import * as React from 'react'
import * as typings from './home.type'

import { Connect } from '../../../../../../components/dynamic-react'

import { buildingList } from '../../../../../common/game-simulated-planet'

import {
    Container, Title, HeaderContainer, MainContainer,
    HeaderInformationContainer, HeaderOperationContainer, HeaderInformationItem
} from './home.style'

import { Tabs, TabPane } from '../../../../../../components/tabs'

import Building from './building/building.component'
import Warship from './warship/warship.component'

export default Connect((props: typings.Props = new typings.Props()) => {
    // 如果没有当前星球信息，不渲染页面
    if (!props.GameSimulatedPlanetStore.currentPlanet) {
        return null
    }

    return (
        <Container>

            <HeaderContainer>
                <HeaderInformationContainer>
                    <HeaderInformationItem>
                        晶体矿储量 {Math.floor(props.GameSimulatedPlanetStore.currentPlanet.crystal)}
                    </HeaderInformationItem>
                    <HeaderInformationItem>
                        瓦斯储量 {Math.floor(props.GameSimulatedPlanetStore.currentPlanet.gas)}
                    </HeaderInformationItem>
                    <HeaderInformationItem>
                        总人口 {Math.floor(props.GameSimulatedPlanetStore.currentPlanet.population)}
                        &nbsp;/ {props.GameSimulatedPlanetStore.currentPlanetPopulationLimit}
                    </HeaderInformationItem>
                    <HeaderInformationItem>
                        建筑空间 {props.GameSimulatedPlanetStore.currentPlanetBuiltSize}
                        &nbsp;/ {props.GameSimulatedPlanetStore.currentPlanet.size}
                    </HeaderInformationItem>
                </HeaderInformationContainer>

                <HeaderOperationContainer>

                </HeaderOperationContainer>
            </HeaderContainer>

            <MainContainer>
                <Tabs>
                    <TabPane title="建筑">
                        <Building />
                    </TabPane>

                    {props.GameSimulatedPlanetStore.gameUser.progress > 4 &&
                        <TabPane title="舰队">
                            <Warship />
                        </TabPane>
                    }

                    {props.GameSimulatedPlanetStore.gameUser.progress > 10 &&
                        <TabPane title="科技">

                        </TabPane>
                    }
                </Tabs>
            </MainContainer>

        </Container>
    )
})