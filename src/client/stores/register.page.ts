import {observable, action} from 'mobx'
import mobxAsyncClass from '../mobx-async-class'

class RegisterPageStore {
    @observable nickname?: string = ''

    @observable password?: string = ''
}

@mobxAsyncClass
export default class RegisterPage {
    store = new RegisterPageStore()

    @action setNickname = async(nickname: string) => {
        this.store.nickname = nickname
    }


    @action.bound
    async setPassword(password: string) {
        this.store.password = password
    }
}