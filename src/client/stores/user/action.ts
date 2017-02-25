import {UsersService} from '../../services'
import UserStore from './store'
import {inject} from '../../../../components/dependency-inject'

export default class UserAction {
    @inject(UserStore)
    private store: UserStore

    /**
     * 自动登录用户
     */
    async loginAuthenticatedUser() {
        try {
            this.store.authenticatedUser = await UsersService.getAuthenticatedUser()
        } catch (error) {
            // 异常静默处理
        }
    }

    /**
     * 注销当前登录用户
     */
    async loginOut() {
        await UsersService.logOut()
        this.store.authenticatedUser = null
    }

    /**
     * 根据用户名密码登录
     */
    async loginWithNicknamePassword(nickname: string, password: string) {
        this.store.authenticatedUser = await UsersService.login({nickname, password})
    }

    /**
     * 根据用户名密码注册
     */
    async registerWithNicknamePassword(nickname: string, password: string) {
        this.store.authenticatedUser = await UsersService.create({nickname, password})
        return true
    }
}