import * as React from 'react'
import ReduxComponent from '../../../../../../components/redux-component'

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
    buildings?: Entitys.GameSimulatedPlanetBuilding[]
}