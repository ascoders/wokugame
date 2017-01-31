import * as React from 'react'
import * as typings from './game-simulated-planet.type'
import {observer, inject} from 'mobx-react'

import Button from '../../../../components/button'

import {GridContainer, Header, Main, Sidebar, Footer} from './game-simulated-planet.style'

export default inject('User')(observer((props: typings.Props = new typings.Props()) => {
    return (
        <GridContainer>
            <Header>

            </Header>

            <Sidebar>
                家园
            </Sidebar>

            <Main>
                总人口 20
            </Main>

            <Footer>

            </Footer>
        </GridContainer>
    )
}))