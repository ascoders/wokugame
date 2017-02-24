import { Container } from '../../../components/dependency-inject'

import UserAction from './user/action'
import LoginPageAction from './login-page/action'
import RegisterPageAction from './register-page/action'
import GameSimulatedPlanetAction from './game-simulated-planet/action'

import UserStore from './user/store'
import LoginPageStore from './login-page/store'
import RegisterPageStore from './register-page/store'
import GameSimulatedPlanetStore from './game-simulated-planet/store'

const container = new Container()

container.set(UserAction, new UserAction())
container.set(LoginPageAction, new LoginPageAction())
container.set(RegisterPageAction, new RegisterPageAction())
container.set(GameSimulatedPlanetAction, new GameSimulatedPlanetAction())

container.set(UserStore, new UserStore())
container.set(LoginPageStore, new LoginPageStore())
container.set(RegisterPageStore, new RegisterPageStore())
container.set(GameSimulatedPlanetStore, new GameSimulatedPlanetStore())

export class Actions {
    UserAction = container.get(UserAction)
    LoginPageAction = container.get(LoginPageAction)
    RegisterPageAction = container.get(RegisterPageAction)
    GameSimulatedPlanetAction = container.get(GameSimulatedPlanetAction)
}

export class Stores {
    UserStore = container.get(UserStore)
    LoginPageStore = container.get(LoginPageStore)
    RegisterPageStore = container.get(RegisterPageStore)
    GameSimulatedPlanetStore = container.get(GameSimulatedPlanetStore)
}