export default {
    namespace: 'pageRegister',
    defaultState: {
        nickname: '',
        password: ''
    },
    reducers: {
        updateNickname: (state, action) => {
            return state.setIn(['nickname'], action.payload)
        },
        updatePassword: (state, action) => {
            return state.setIn(['password'], action.payload)
        }
    }
} as God.Model<Models.PageRegister>