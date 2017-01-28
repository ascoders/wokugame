import {observable, action} from 'mobx'

class RegisterPageStore {
    @observable nickname?: string = ''

    @observable password?: string = ''
}

export default class RegisterPage {
    store = new RegisterPageStore()

    @action.bound setNickname(nickname: string) {
        this.store.nickname = nickname
    }

    @action.bound setPassword(password: string) {
        this.store.password = password
    }
}