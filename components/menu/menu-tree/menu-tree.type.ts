import * as React from 'react'

export class Props implements React.Props<any> {
    /**
     * 子菜单标题
     */
    title?: string | (() => React.ReactElement<any>) = ''

    children?: React.ReactNode
}