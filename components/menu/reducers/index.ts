export interface IState {
    height?: number
}

const initialState: IState = {
    height: 46
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case 'setHeight':
            return Object.assign({}, state, {
                height: action.payload
            })
        default:
            return state
    }
}