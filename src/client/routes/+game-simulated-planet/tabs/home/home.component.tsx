import * as React from 'react'
import * as typings from './home.type'

import { Connect } from '../../../../../../components/dynamic-react'
import { Stores } from '../../../../stores'

import { buildingList } from '../../../../../common/game-simulated-planet'

import {
    Container, Title, ListContainer, HeaderContainer, MainContainer,
    HeaderInformationContainer, HeaderOperationContainer, HeaderInformationItem, ButtonContainer
} from './home.style'

import { Tabs, TabPane } from '../../../../../../components/tabs'

import BuildingCard from '../../components/building-card/building-card.component'
import Build from './build/build.component'
import Collection from './collection/collection.component'

export default Connect<Stores>(state => {
    const currentPlanet = state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex]

    return {
        progress: state.GameSimulatedPlanetStore.gameUser.progress,
        currentPlanet,
        currentPlanetPopulationLimit: state.GameSimulatedPlanetStore.currentPlanetPopulationLimit,
        currentPlanetBuiltSize: state.GameSimulatedPlanetStore.currentPlanetBuiltSize
    }
})((props: typings.Props = new typings.Props()) => {
    // 如果没有当前星球信息，不渲染页面
    if (!props.currentPlanet) {
        return null
    }

    const BuildingCards = props.currentPlanet.buildings.sort((left, right) => {
        if (left.type === right.type) {
            if (right.level == left.level) {
                // 等级相同，则按照建造时间排序
                return new Date(right.buildStart).getTime() - new Date(left.buildStart).getTime()
            }
            return right.level - left.level
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
                        晶体矿储量 {Math.floor(props.currentPlanet.crystal)}
                    </HeaderInformationItem>
                    <HeaderInformationItem>
                        瓦斯储量 {Math.floor(props.currentPlanet.gas)}
                    </HeaderInformationItem>
                    <HeaderInformationItem>
                        总人口 {Math.floor(props.currentPlanet.population)}
                        &nbsp;/ {props.currentPlanetPopulationLimit}
                    </HeaderInformationItem>
                    <HeaderInformationItem>
                        建筑空间 {props.currentPlanetBuiltSize}
                        &nbsp;/ {props.currentPlanet.size}
                    </HeaderInformationItem>
                </HeaderInformationContainer>

                <HeaderOperationContainer>

                </HeaderOperationContainer>
            </HeaderContainer>

            <MainContainer>
                <Tabs>
                    <TabPane title="建筑">
                        <ButtonContainer>
                            <Collection />
                            {props.progress >= 1 &&
                                <Build />
                            }
                        </ButtonContainer>

                        {props.currentPlanet.progress > 0 &&
                            <Title>生产建筑</Title>
                        }

                        <ListContainer>
                            {BuildingCards}
                        </ListContainer>

                        {props.currentPlanet.progress > 10 &&
                            <Title>防御建筑</Title>
                        }

                        {props.currentPlanet.progress > 20 &&
                            <Title>军事建筑</Title>
                        }
                    </TabPane>

                    {props.currentPlanet.buildings.length > 10 &&
                        <TabPane title="科技">

                        </TabPane>
                    }


                    {props.currentPlanet.buildings.length > 20 &&
                        <TabPane title="舰队">

                        </TabPane>
                    }
                </Tabs>
            </MainContainer>

        </Container>
    )
})