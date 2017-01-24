import {UsersService} from '../../services'

export default {
    namespace: 'user',
    defaultState: {},
    reducers: {
        /**
         * 创建用户
         */
        create: (state, action) => {
            UsersService.create({
                nickname: action.payload.nickname,
                password: action.payload.password
            })
            return state
        }
    }
} as God.Model<Models.Application>