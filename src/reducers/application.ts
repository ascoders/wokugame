const initialState = {
    headerColor: 'blue'
}

export interface Action {
    type: string,
    payload?: any
}

export default function applicationReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'HEADER_COLOR':
            return {
                ...state,
                headerColor: action.payload
            }
    }
    return state
}