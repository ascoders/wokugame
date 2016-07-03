import * as React from 'react'
import * as defintion from './defintion'
import * as process from 'process'

export default class RoutesBase <P, S> extends React.Component<defintion.PropsInterface,defintion.StateInterface> {
    static defaultProps: defintion.PropsInterface = new defintion.Props()
    public state: defintion.StateInterface = new defintion.State()
    public static title: string

    constructor(props: any) {
        super(props)

        // 如果是前端,设置页面标题
        if (process.browser) {
            document.title = this.getTitle()
        }
    }

    protected getTitle(): string {
        return null
    }
}