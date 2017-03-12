import StoreProps from '../../../../../../../stores'
import { Warship } from '../../../../../../../../common/game-simulated-planet'

export class Props extends StoreProps {
    warship?: Warship

    onClose?: () => void
}


export class State {
    /**
     * 当前装备占用空间
     */
    selectedSize?: number = 0

    /**
     * 用户给战舰起的名字
     */
    name?: string
}