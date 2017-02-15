export interface Iaction<Payload> {
    type: string
    payload?: Payload
    error?: boolean
    meta?: string
}

export interface Imodel<State> {
    namespace: string

    /**
     * redux init state
     */
    state: State

    /**
     * redux reducers
     */
    reducers: {
        [reducer: string]: (state?: State, action?: Iaction<any>) => State
    }
}

export const model = <T>(params: Imodel<T>) => {
    return params
}