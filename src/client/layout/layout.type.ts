import * as React from 'react'
import ReduxComponent from '../../../components/redux-component'
import User from '../stores/user'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    User?: User
}