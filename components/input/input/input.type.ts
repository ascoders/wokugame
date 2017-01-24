import ReduxComponent from '../../redux-component'

export class Props extends ReduxComponent {
    value?: string = undefined
    defaultValue?: string = undefined

    /**
     * 提示文案
     */
    label?: string = null

    onChange?: (event: React.FormEvent<HTMLInputElement>) => void = () => {

    }
}

export class State {
    /**
     * 是否处于焦点
     */
    focus?: boolean
}