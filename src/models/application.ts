export default {
    namespace: 'application',
    defaultState: {
        headerColor: 'red'
    },
    reducers: {
        changeHeaderColor: (state, action) => {
            return state.setIn(['headerColor'], action.payload)
        }
    }
} as God.Model<Models.Application>