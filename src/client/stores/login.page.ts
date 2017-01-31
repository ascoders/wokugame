import {observable} from 'mobx'
import asyncAction from '../mobx-async-action'

class LoginPageStore {
    @observable nickname?: string = ''

    @observable password?: string = ''
}

export default class LoginPage {
    store = new LoginPageStore()

    @asyncAction
    async setNickname(nickname: string) {
        this.store.nickname = nickname
    }

    @asyncAction
    async setPassword(password: string) {
        this.store.password = password
    }
}