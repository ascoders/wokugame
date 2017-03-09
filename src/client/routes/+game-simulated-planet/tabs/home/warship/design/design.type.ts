import StoreProps from '../../../../../../stores'
import { Airship } from '../../../../../../../common/game-simulated-planet'

export class Props extends StoreProps {
    airship?: Airship
}


export class State {
    /**
     * 是否显示模态框
     */
    show?: boolean = false
}