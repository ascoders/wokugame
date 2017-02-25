import {UsersService} from '../../services'
import RegisterPageStore from './store'
import {inject} from '../../../../components/dependency-inject'

export default class RegisterPageAction {
    @inject(RegisterPageStore)
    private store: RegisterPageStore

    setNickname(nickname: string) {
        this.store.nickname = nickname
    }

    setPassword(password: string) {
        this.store.password = password
    }
}