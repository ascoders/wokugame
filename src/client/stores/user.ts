import {observable} from 'mobx'
import {UsersService} from '../services'
import asyncAction from '../mobx-async-action'

class UserStore {
    /**
     * 主态用户
     */
    @observable authenticatedUser?: any = {
        id: null,
        nickname: null
    }
}

export default class User {
    store = new UserStore()

    /**
     * 设置主态用户
     */
    @asyncAction
    async setAuthenticatedUser(user?: any) {
        this.store.authenticatedUser = user
    }

    /**
     * 根据用户名密码登录
     */
    @asyncAction
    async loginWithNicknamePassword(nickname: string, password: string) {
        const user = await UsersService.login({nickname, password})
        this.setAuthenticatedUser(user)
        return true
    }

    /**
     * 根据用户名密码注册
     */
    @asyncAction
    async registerWithNicknamePassword(nickname: string, password: string) {
        const user = await UsersService.create({nickname, password})
        this.setAuthenticatedUser(user)
        return true
    }

    /**
     * 如果当前已经处于登录状态，设置主态用户信息
     */
    @asyncAction
    async loginAuthenticatedUser() {
        try {
            const user = await UsersService.getAuthenticatedUser()
            this.setAuthenticatedUser(user)
        } catch (error) {
            // 异常静默处理
        }
    }

    /**
     * 注销当前认证用户
     */
    @asyncAction
    async loginOut() {
        const user = await UsersService.logOut()
        this.setAuthenticatedUser({
            id: null,
            nickname: null
        })
    }
}