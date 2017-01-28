import {observable, action} from 'mobx'

class UserStore {
    /**
     * 主态用户
     */
    @observable currentUser?: any
}

export default class User {
    store = new UserStore()

    /**
     * 设置主态用户
     */
    @action.bound setCurrentUser(user?: any) {
        this.store.currentUser = user
    }

    /**
     * 根据用户名密码登录
     */
    @action.bound loginWithNicknamePassword(nickname: string, password: string) {

    }
}