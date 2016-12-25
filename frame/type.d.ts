declare namespace God {
    export interface Model<T> {
        namespace: string
        defaultState ?: T
        reducers?: {
            [actionName: string]: (state?: T, action?: Action) => T
        }
    }

    export interface Action {
        type: string
        payload?: any
        error?: boolean
        meta?: string
    }
}