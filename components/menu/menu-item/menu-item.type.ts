import ReduxComponent from '../../redux-component'
import Menu from '../reducers/index'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    height?: number

    onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void
}