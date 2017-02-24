import * as React from 'react'
import ReduxComponent from '../../../../../../../components/redux-component'
import { Actions } from '../../../../../stores'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    actions?: Actions
    /**
     * [injected]
     */
    planetId?: number
    /**
     * [injected] 上次采集的时间
     */
    lastCollectionTime?: number
}


export class State {
    /**
     * 当前进度百分比
     */
    progress = 0
}