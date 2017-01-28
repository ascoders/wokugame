import iFetch from '../../utils/fetch'

/**
 * 创建新用户
 */
interface ICreate {
    nickname: string
    password: string
}

export const create = async(options: ICreate) => {
    return await iFetch<ICreate>('/api/users', {
        nickname: options.nickname,
        password: options.password
    })
}

/**
 * 登录用户
 */
interface ILogin {
    nickname?: string
    password: string
}

export const login = async(options: ILogin) => {
    return await iFetch<ILogin>('/api/users/login', {
        nickname: options.nickname,
        password: options.password
    })
}