import * as React from 'react'
import * as typings from './home.type'

import { Connect } from '../../../../../../components/dynamic-react'

import { buildingList } from '../../../../../common/game-simulated-planet'

import {
    Container, Title, ListContainer, HeaderContainer, MainContainer,
    HeaderInformationContainer, HeaderOperationContainer, HeaderInformationItem, ButtonContainer, ScrollContainer
} from './home.style'

import { Tabs, TabPane } from '../../../../../../components/tabs'

import BuildingCard from '../../components/building-card/building-card.component'
import Build from './build/build.component'
import Collection from './collection/collection.component'

export default Connect((props: typings.Props = new typings.Props()) => {
    // 如果没有当前星球信息，不渲染页面
    if (!props.GameSimulatedPlanetStore.currentPlanet) {
        return null
    }

    const BuildingCards = props.GameSimulatedPlanetStore.currentPlanet.buildings.sort((left, right) => {
        if (left.type === right.type) {
            // 类型相同，按照建造时间排序
            return new Date(right.created).getTime() - new Date(left.created).getTime()
        }
        return buildingList.findIndex(name => name === right.type) - buildingList.findIndex(name => name === left.type)
    }).map((building, index) => {
        return (
            <BuildingCard key={building.id} buildingId={building.id} />
        )
    })

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
                        <ScrollContainer>
                            <ButtonContainer>
                                <Collection />
                                {props.GameSimulatedPlanetStore.gameUser.progress >= 1 &&
                                    <Build />
                                }
                            </ButtonContainer>

                            <ListContainer>
                                {BuildingCards}
                            </ListContainer>
                        </ScrollContainer>
                    </TabPane>

                    {props.GameSimulatedPlanetStore.currentPlanet.buildings.length > 10 &&
                        <TabPane title="科技">

                        </TabPane>
                    }


                    {props.GameSimulatedPlanetStore.currentPlanet.buildings.length > 20 &&
                        <TabPane title="舰队">

                        </TabPane>
                    }
                </Tabs>
            </MainContainer>

        </Container>
    )
})