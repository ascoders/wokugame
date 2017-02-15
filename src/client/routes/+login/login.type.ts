import ReduxComponent from '../../../../components/redux-component'
import {State, Actions} from '../../models'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    nickname?: string
    /**
     * [injected]
     */
    password?: string
    /**
     * [injected]
     */
    actions?: Actions
}