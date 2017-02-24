import * as React from 'react'
import ReduxComponent from '../../../components/redux-component'
import { Actions } from '../stores'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    user?: Entitys.User
    /**
     * [injected]
     */
    actions?: Actions
}