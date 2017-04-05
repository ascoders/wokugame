import * as React from 'react'

import { Container } from 'dependency-inject'
import ReactProps from '@gaea/react-props'

import UserAction from './user/action'
import LoginPageAction from './login-page/action'
import RegisterPageAction from './register-page/action'
import GameSimulatedPlanetAction from './game-simulated-planet/action'
import ApplicationAction from './application/action'

import UserStore from './user/store'
import LoginPageStore from './login-page/store'
import RegisterPageStore from './register-page/store'
import GameSimulatedPlanetStore from './game-simulated-planet/store'
import ApplicationStore from './application/store'

const container = new Container()

container.set(UserAction, new UserAction())
container.set(LoginPageAction, new LoginPageAction())
container.set(RegisterPageAction, new RegisterPageAction())
container.set(GameSimulatedPlanetAction, new GameSimulatedPlanetAction())
container.set(ApplicationAction, new ApplicationAction())

container.set(UserStore, new UserStore())
container.set(LoginPageStore, new LoginPageStore())
container.set(RegisterPageStore, new RegisterPageStore())
container.set(GameSimulatedPlanetStore, new GameSimulatedPlanetStore())
container.set(ApplicationStore, new ApplicationStore())

export default class StoreProps extends ReactProps {
    UserAction?: UserAction = container.get(UserAction)
    LoginPageAction?: LoginPageAction = container.get(LoginPageAction)
    RegisterPageAction?: RegisterPageAction = container.get(RegisterPageAction)
    GameSimulatedPlanetAction?: GameSimulatedPlanetAction = container.get(GameSimulatedPlanetAction)
    ApplicationAction?: ApplicationAction = container.get(ApplicationAction)

    UserStore?: UserStore = container.get(UserStore)
    LoginPageStore?: LoginPageStore = container.get(LoginPageStore)
    RegisterPageStore?: RegisterPageStore = container.get(RegisterPageStore)
    GameSimulatedPlanetStore?: GameSimulatedPlanetStore = container.get(GameSimulatedPlanetStore)
    ApplicationStore?: ApplicationStore = container.get(ApplicationStore)
}