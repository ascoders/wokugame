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
     * [injected]
     */
    actions?: Actions
}