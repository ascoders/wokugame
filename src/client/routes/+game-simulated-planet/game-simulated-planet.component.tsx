import * as React from 'react'
import * as typings from './game-simulated-planet.type'

import { Connect } from 'dynamic-react'

import { Tabs, TabPane } from '../../../../components/tabs'
import { Interval } from '../../../../components/timer'

import { tips } from '../../../common/game-simulated-planet'

import {
    Container,
    HeaderContainer,
    TipContainer,
    ContentContainer,
    SidebarContainer,
    MainContainer,
    SidebarItem
} from './game-simulated-planet.style'

import TabsHome from './tabs/home/home.component'

@Connect
export default class GameSimulatedPlanetScene extends React.Component<typings.Props, any> {
    static defaultProps = new typings.Props()
    private interval: Interval

    componentWillMount() {
        this.props.ApplicationAction.showScroll(false)

        this.props.GameSimulatedPlanetAction.loginAuthenticatedUser().then(() => {
            this.interval = new Interval(() => {
                this.props.GameSimulatedPlanetAction.freshCurrentPlanet()
            }, 1000)
        })
    }

    componentWillUnmount() {
        this.props.ApplicationAction.showScroll(true)
        this.interval.stop()
    }

    render() {
        if (!this.props.GameSimulatedPlanetStore.gameUser) {
            return null
        }

        return (
            <Container>
                <HeaderContainer>

                </HeaderContainer>

                <TipContainer>
                    {tips.get(this.props.GameSimulatedPlanetStore.gameUser.progress)}
                </TipContainer>

                <ContentContainer>
                    <SidebarContainer>
                        <SidebarItem theme={{ active: true }}>家园</SidebarItem>
                    </SidebarContainer>

                    <MainContainer>
                        <TabsHome />
                    </MainContainer>
                </ContentContainer>
            </Container>
        )
    }
}