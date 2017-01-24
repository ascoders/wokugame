/**
 * 创建新用户
 */

interface ICreate {
    nickname: string
    password: string
}

export const create = async(options: ICreate) => {
    return await fetch('/api/users', {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nickname: options.nickname,
            password: options.password
        })
    })
}