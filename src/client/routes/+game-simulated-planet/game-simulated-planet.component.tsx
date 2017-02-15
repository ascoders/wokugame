import * as React from 'react'
import * as typings from './game-simulated-planet.type'
import {connect} from '../../../../components/reax'
import {State, Actions} from '../../models'

import {Tabs, TabPane} from '../../../../components/tabs'
import {Interval} from '../../../../components/timer'

import {tips} from '../../../common/game-simulated-planet'

import {
    GridContainer,
    Header,
    Main,
    SidebarTop,
    SidebarBottom,
    Footer,
    NotifyContainer,
    SidebarMenuItem,
    ScrollXContainer
} from './game-simulated-planet.style'

import TabsHome from './tabs/home/home.component'

@connect<State,typings.Props>(state => {
    if (!state.gameSimulated.gameUser) {
        return {}
    }

    return {
        gameUserProcess: state.gameSimulated.gameUser.progress
    }
}, dispatch => {
    return {
        actions: new Actions(dispatch)
    }
})
export default class GameSimulatedPlanetScene extends React.Component<typings.Props,any> {
    static defaultProps = new typings.Props()
    private interval: Interval

    componentWillMount = async() => {
        await this.props.actions.gameSimulated.loginAuthenticatedUser()
        this.interval = new Interval(() => {
            this.props.actions.gameSimulated.freshCurrentPlanet()
        }, 1000)
    }

    componentWillUnmount() {
        this.interval.stop()
    }

    render() {
        if (!this.props.gameUserProcess) {
            return null
        }

        return (
            <GridContainer>
                <Header>

                </Header>

                {this.props.gameUserProcess >= 1 &&
                <SidebarTop>
                    <SidebarMenuItem theme={{active:true}}>家园</SidebarMenuItem>
                </SidebarTop>
                }

                <SidebarBottom>
                    <Tabs>
                        <TabPane title="提醒">
                            <NotifyContainer
                                dangerouslySetInnerHTML={{__html:tips.get(this.props.gameUserProcess)}}/>
                        </TabPane>
                    </Tabs>
                </SidebarBottom>

                <Main>
                    <ScrollXContainer>
                        <TabsHome/>
                    </ScrollXContainer>
                </Main>

                <Footer>

                </Footer>
            </GridContainer>
        )
    }
}