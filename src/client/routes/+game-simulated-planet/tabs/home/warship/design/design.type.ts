import StoreProps from '../../../../../../stores'
import { Warship } from '../../../../../../../common/game-simulated-planet'

export class Props extends StoreProps {
    warship?: Warship
}


export class State {
    /**
     * 是否显示模态框
     */
    show?: boolean = false
}