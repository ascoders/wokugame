const defaultState: Models.Application = {
    headerColor: 'red'
}

export default {
    namespace: 'application',
    defaultState: defaultState,
    reducers: {
        changeHeaderColor: (state, action) => {
            return {
                ...state,
                headerColor: action.payload
            }
        }
    }
} as God.Model<Models.Application>