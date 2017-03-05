import * as React from 'react'
import * as typings from './building.type'

import { Connect } from '../../../../../../../components/dynamic-react'

import { buildingList } from '../../../../../../common/game-simulated-planet'

import {
    Container, ButtonContainer, ListContainer
} from './building.style'

import { Tabs, TabPane } from '../../../../../../../components/tabs'

import BuildingCard from '../../../components/building-card/building-card.component'
import Build from './build/build.component'
import Collection from './collection/collection.component'

export default Connect((props: typings.Props = new typings.Props()) => {
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
            <ButtonContainer>
                <Collection />
                {props.GameSimulatedPlanetStore.gameUser.progress >= 1 &&
                    <Build />
                }
            </ButtonContainer>

            <ListContainer>
                {BuildingCards}
            </ListContainer>
        </Container>
    )
})