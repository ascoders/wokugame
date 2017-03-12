import StoreProps from '../../../../../../stores'
import { Warship } from '../../../../../../../common/game-simulated-planet'

export class Props extends StoreProps {
    designedWarship?: Entitys.GameSimulatedPlanetWarship
}


export class State {
    /**
     * 准备建造的数量
     */
    productCount = 0
}