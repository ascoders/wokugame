import * as React from 'react'
import ReduxComponent from '../../../../../../components/redux-component'
import { Actions } from '../../../../stores'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    currentPlanet?: Entitys.GameSimulatedPlanetPlanet
    /**
     * [injected]
     */
    currentPlanetPopulationLimit?: number
    /**
     * [injected]
     */
    currentPlanetBuiltSize?: number
    /**
     * [injected] 游戏进度
     */
    progress?: number
    /**
     * [injected]
     */
    actions?: Actions
}