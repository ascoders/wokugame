import * as React from 'react'

export interface IAction {
    type: string
    payload?: any
}

export default class ReduxComponent implements React.Props<any> {
    /**
     * [injected]
     */
    children?: React.ReactNode

    /**
     * [injected] Redux dispatch
     */
    dispatch?: (action: IAction) => void
}