import * as React from 'react'
import * as typings from './collection.type'

import { Connect } from '../../../../../../../components/dynamic-react'
import { Stores } from '../../../../../stores'

import {
    Container,
    Text,
    Progress
} from './collection.style'

@Connect<Stores>(state => {
    return {
        planetId: state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex].id
    }
})
export default class Build extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    state = new typings.State()

    handleClick = () => {
        this.props.actions.GameSimulatedPlanetAction.collection(this.props.planetId)
    }

    render() {
        return (
            <Container onClick={this.handleClick}>
                <Text>采集</Text>
                <Progress style={{ width: '20%' }} />
            </Container>
        )
    }
}