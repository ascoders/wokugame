import ReduxComponent from '../../../../components/redux-component'
import { Actions } from '../../stores'

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