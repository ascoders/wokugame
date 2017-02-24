import ReduxComponent from '../../../../components/redux-component'
import { Actions } from '../../stores'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    gameUserProcess?: number

    /**
     * [injected]
     */
    actions?: Actions
}