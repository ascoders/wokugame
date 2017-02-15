import * as React from 'react'
import ReduxComponent from '../../../../../../../components/redux-component'
import {Actions} from '../../../../../models'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    currentPlanet?: Entitys.GameSimulatedPlanetPlanet
    /**
     * [injected]
     */
    actions?: Actions
    /**
     * [injected]
     */
    gameUserId?: number
    /**
     * [injected]
     */
    gameUserProcess?: number
    /**
     * [injected]
     */
    currentPlanetBuiltSize?: number
    /**
     * [injected]
     */
    buildings?: Entitys.GameSimulatedPlanetBuilding[]
}


export class State {
    /**
     * 是否显示模态框
     */
    show?: boolean = false
}