import * as React from 'react'
import ReduxComponent from '../../redux-component'

export class Props extends ReduxComponent {
    /**
     * 子菜单标题
     */
    title?: string | (() => React.ReactElement<any>) = ''

    /**
     * [injected]
     */
    height?: number
}