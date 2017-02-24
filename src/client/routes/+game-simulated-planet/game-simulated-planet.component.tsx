import * as React from 'react'
import * as typings from './game-simulated-planet.type'

import { Connect } from '../../../../components/dynamic-react'
import { Stores } from '../../stores'

import { Tabs, TabPane } from '../../../../components/tabs'
import { Interval } from '../../../../components/timer'

import { tips } from '../../../common/game-simulated-planet'

import {
    GridContainer,
    Header,
    Main,
    Sidebar,
    Footer,
    SidebarMenuItem
} from './game-simulated-planet.style'

import TabsHome from './tabs/home/home.component'

@Connect<Stores>(state => {
    return {
        gameUserProcess: state.GameSimulatedPlanetStore.gameUser && state.GameSimulatedPlanetStore.gameUser.progress
    }
})
export default class GameSimulatedPlanetScene extends React.Component<typings.Props, any> {
    static defaultProps = new typings.Props()
    private interval: Interval

    componentWillMount = async () => {
        await this.props.actions.GameSimulatedPlanetAction.loginAuthenticatedUser()
        this.interval = new Interval(() => {
            this.props.actions.GameSimulatedPlanetAction.freshCurrentPlanet()
        }, 1000)
    }

    componentWillUnmount() {
        this.interval.stop()
    }

    render() {
        if (this.props.gameUserProcess === undefined) {
            return null
        }

        return (
            <GridContainer>
                <Header>

                </Header>

                {this.props.gameUserProcess >= 1 &&
                    <Sidebar>
                        <SidebarMenuItem theme={{ active: true }}>家园</SidebarMenuItem>
                    </Sidebar>
                }

                <Main>
                    <TabsHome />
                </Main>

                <Footer>
                    {tips.get(this.props.gameUserProcess)}
                </Footer>
            </GridContainer>
        )
    }
}