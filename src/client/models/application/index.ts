export default {
    namespace: 'application',
    defaultState: {
        navbarHeight: 46
    },
    reducers: {
        changeHeaderColor: (state, action) => {
            return state.setIn(['navbarHeight'], action.payload)
        }
    }
} as God.Model<Models.Application>