import * as React from 'react'
import ReduxComponent from '../../../../../../components/redux-component'
import {Actions} from '../../../../models'
import {BuildingHelper} from '../../../../../common/game-simulated-planet'

export class Props extends ReduxComponent {
    /**
     * [injected]
     */
    building?: Entitys.GameSimulatedPlanetBuilding

    /**
     * [injected]
     */
    gameUserId?: number

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