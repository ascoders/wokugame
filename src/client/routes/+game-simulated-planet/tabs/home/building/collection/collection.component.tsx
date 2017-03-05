import * as React from 'react'
import * as typings from './collection.type'
import { Interval } from '../../../../../../../../components/timer'

import { Connect } from '../../../../../../../../components/dynamic-react'

import { collectionInterval } from '../../../../../../../common/game-simulated-planet'

import {
    Container,
    Text,
    Progress
} from './collection.style'

@Connect
export default class Build extends React.Component<typings.Props, typings.State> {
    static defaultProps = new typings.Props()
    state = new typings.State()

    private interval: Interval

    componentWillMount() {
        this.interval = new Interval(() => {
            const nowTime = new Date().getTime()
            const lastCollectionTime = new Date(this.props.GameSimulatedPlanetStore.currentPlanet.lastCollection).getTime()
            if (nowTime - lastCollectionTime > collectionInterval) {
                this.setState({
                    progress: 100
                })
            } else {
                this.setState({
                    progress: (nowTime - lastCollectionTime) / collectionInterval * 100
                })
            }
        }, 200)
    }

    componentWillUnmount() {
        this.interval.stop()
    }

    handleClick = () => {
        if (this.state.progress !== 100) {
            return
        }

        this.props.GameSimulatedPlanetAction.collection(this.props.GameSimulatedPlanetStore.currentPlanet.id)
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