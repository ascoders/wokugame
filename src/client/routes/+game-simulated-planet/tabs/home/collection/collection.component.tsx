import * as React from 'react'
import * as typings from './collection.type'
import { Interval } from '../../../../../../../components/timer'

import { Connect } from '../../../../../../../components/dynamic-react'
import { Stores } from '../../../../../stores'

import { collectionInterval } from '../../../../../../common/game-simulated-planet'

import {
    Container,
    Text,
    Progress
} from './collection.style'

@Connect<Stores>(state => {
    return {
        planetId: state.GameSimulatedPlanetStore.gameUser.planets[state.GameSimulatedPlanetStore.currentPlanetIndex].id,
        lastCollectionTime: new Date(state.GameSimulatedPlanetStore.gameUser.lastCollection).getTime()
    }
})
export default class Build extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    state = new typings.State()

    private interval: Interval

    componentWillMount() {
        this.interval = new Interval(() => {
            const nowTime = new Date().getTime()
            if (nowTime - this.props.lastCollectionTime > collectionInterval) {
                this.setState({
                    progress: 100
                })
            } else {
                this.setState({
                    progress: (nowTime - this.props.lastCollectionTime) / collectionInterval * 100
                })
            }
        }, 200)
    }

    handleClick = () => {
        if (this.state.progress !== 100) {
            return
        }
        this.props.actions.GameSimulatedPlanetAction.collection(this.props.planetId)
    }

    render() {
        return (
            <Container onClick={this.handleClick} theme={{ disabled: this.state.progress !== 100 }}>
                <Text theme={{ disabled: this.state.progress !== 100 }}>采集</Text>
                {this.state.progress !== 100 &&
                    <Progress style={{ width: `${this.state.progress}%` }} />
                }
            </Container>
        )
    }
}