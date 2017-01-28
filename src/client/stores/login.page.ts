import {observable, action} from 'mobx'

class LoginPageStore {
    @observable nickname?: string = ''

    @observable password?: string = ''
}

export default class LoginPage {
    store = new LoginPageStore()

    @action.bound setNickname(nickname: string) {
        this.store.nickname = nickname
    }

    @action.bound setPassword(password: string) {
        this.store.password = password
    }
}