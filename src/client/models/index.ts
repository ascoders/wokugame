import {UserStore, UserModel, UserActions} from './user'
import {LoginPageStore, LoginPageModel, LoginPageActions} from './login.page'
import {RegisterPageStore, RegisterPageModel, RegisterPageActions} from './register.page'
import {GameSimulatedStore, GameSimulatedModel, GameSimulatedActions} from './game-simulated-planet'
import {bindActionCreators, Dispatch} from 'redux'

export interface State {
    user: UserStore
    loginPage: LoginPageStore
    registerPage: RegisterPageStore
    gameSimulated: GameSimulatedStore
}

export const Models = [
    UserModel,
    LoginPageModel,
    RegisterPageModel,
    GameSimulatedModel
]

export class Actions {
    private dispatch: Dispatch<any>

    constructor(dispatch: Dispatch<any>) {
        this.dispatch = dispatch
    }

    get user(): UserActions {
        return bindActionCreators(new UserActions() as any, this.dispatch)
    }

    get loginPage(): LoginPageActions {
        return bindActionCreators(new LoginPageActions() as any, this.dispatch)
    }

    get registerPage(): RegisterPageActions {
        return bindActionCreators(new RegisterPageActions() as any, this.dispatch)
    }

    get gameSimulated(): GameSimulatedActions {
        return bindActionCreators(new GameSimulatedActions() as any, this.dispatch)
    }
}