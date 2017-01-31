import iFetch from '../utils/fetch'

/**
 * 创建新用户
 */
interface ICreate {
    nickname: string
    password: string
}

export const create = async(options: ICreate) => {
    return await iFetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            nickname: options.nickname,
            password: options.password
        })
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
    return await iFetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            nickname: options.nickname,
            password: options.password
        })
    })
}

/**
 * 获取当前登录的用户
 */
export const getAuthenticatedUser = async() => {
    return await iFetch('/api/user', {
        method: 'get'
    })
}

/**
 * 注销当前登录的用户
 */
export const logOut = async() => {
    return await iFetch('/api/user', {
        method: 'delete'
    })
}