import ReduxComponent from '../../redux-component'

export class Props extends ReduxComponent {
    /**
     * 进度 0~100
     */
    progress: number = 0

    height?: string = '10px'
}