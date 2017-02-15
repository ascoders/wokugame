import ReduxComponent from '../../../../components/redux-component'
import {State, Actions} from '../../models'

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