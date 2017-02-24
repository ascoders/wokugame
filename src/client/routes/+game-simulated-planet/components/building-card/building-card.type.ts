import * as React from 'react'
import ReduxComponent from '../../../../../../components/redux-component'
import { BuildingHelper } from '../../../../../common/game-simulated-planet'
import { Actions } from '../../../../stores'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    building?: Entitys.GameSimulatedPlanetBuilding

    /**
     * [injected]
     */
    planetId?: number

    /**
     * [injected]
     */
    actions?: Actions

    /**
     * [injected]
     */
    buildingHelper?: BuildingHelper

    /**
     * [injected]
     */
    serverTimeDiff?: number

    /**
     * 建筑的 id
     */
    buildingId?: number
}