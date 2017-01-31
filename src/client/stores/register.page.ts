import {observable} from 'mobx'
import asyncAction from '../mobx-async-action'

class RegisterPageStore {
    @observable nickname?: string = ''

    @observable password?: string = ''
}

export default class RegisterPage {
    store = new RegisterPageStore()

    @asyncAction
    async setNickname(nickname: string) {
        this.store.nickname = nickname
    }

    @asyncAction
    async setPassword(password: string) {
        this.store.password = password
    }
}