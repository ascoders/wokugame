import * as React from 'react'
import ReduxComponent from '../../redux-component'
import Menu from '../stores/index'

export class Props extends ReduxComponent {
    /**
     * 子菜单标题
     */
    title?: string | (() => React.ReactElement<any>) = ''

    /**
     * [injected]
     */
    Menu?: Menu
}