import { UsersService } from '../../services'
import LoginPageStore from './store'
import { inject } from '../../../../components/dependency-inject'

export default class LoginPageAction {
    @inject(LoginPageStore)
    public store: LoginPageStore

    setNickname(nickname: string) {
        this.store.nickname = nickname
    }

    setPassword(password: string) {
        this.store.password = password
    }
}