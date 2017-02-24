import ReduxComponent from '../../redux-component'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    height?: number

    onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void
}