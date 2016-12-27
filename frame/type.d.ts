import * as SeamlessImmutable from 'seamless-immutable'

export as namespace God

export interface Model<T> {
    namespace: string
    defaultState ?: T
    reducers?: {
        [actionName: string]: (state?: SeamlessImmutable.ImmutableObject<T>, action?: Action) => SeamlessImmutable.ImmutableObject<T>
    }
}

export interface Action {
    type: string
    payload?: any
    error?: boolean
    meta?: string
}