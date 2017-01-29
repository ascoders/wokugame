import {observable, action} from 'mobx'
import {UsersService} from '../services'
import mobxAsyncClass from '../mobx-async-class'

class UserStore {
    /**
     * 主态用户
     */
    @observable currentUser?: any
}

@mobxAsyncClass
export default class User {
    store = new UserStore()

    /**
     * 设置主态用户
     */
    @action.bound
    async setCurrentUser(user?: any) {
        this.store.currentUser = user
    }

    /**
     * 根据用户名密码登录
     */
    @action.bound
    async loginWithNicknamePassword(nickname: string, password: string) {
        await UsersService.login({nickname, password})
    }

    /**
     * 根据用户名密码注册
     */
    @action.bound
    async registerWithNicknamePassword(nickname: string, password: string) {
        await UsersService.create({nickname, password})
    }
}