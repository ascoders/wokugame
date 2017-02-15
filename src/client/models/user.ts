import {model, Iaction} from '../../../components/reax'
import {UsersService} from '../services'

export class UserStore {
    /**
     * 登录用户
     */
    authenticatedUser?: Entitys.User
}

export const UserModel = model<UserStore>({
    namespace: 'user',
    state: new UserStore(),
    reducers: {
        setAuthenticatedUser: (state, action: Iaction<Entitys.User>) => {
            return {
                ...state,
                authenticatedUser: action.payload
            }
        }
    }
})

export class UserActions {
    /**
     * 自动登录用户
     */
    loginAuthenticatedUser = async() => {
        try {
            const user = await UsersService.getAuthenticatedUser()
            return {
                type: 'user/setAuthenticatedUser',
                payload: user
            }
        } catch (error) {
            // 异常静默处理
        }
    }

    /**
     * 注销当前登录用户
     */
    loginOut = async() => {
        await UsersService.logOut()
        return {
            type: 'user/setAuthenticatedUser',
            payload: null
        }
    }
    /**
     * 根据用户名密码登录
     */
    loginWithNicknamePassword = async(nickname: string, password: string) => {
        const user = await UsersService.login({nickname, password})
        return {
            type: 'user/setAuthenticatedUser',
            payload: user
        }
    }

    /**
     * 根据用户名密码注册
     */
    registerWithNicknamePassword = async(nickname: string, password: string) => {
        const user = await UsersService.create({nickname, password})
        return {
            type: 'user/setAuthenticatedUser',
            payload: user
        }
    }
}