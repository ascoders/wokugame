import ReduxComponent from '../../redux-component'
import Menu from '../stores/index'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    Menu?: Menu

    onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void
}