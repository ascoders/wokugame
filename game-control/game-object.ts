import {default as GameControl} from './index'

export default class GameObject<T> {
    // 游戏对象本身，比如 Sprite
    public object: T

    // 游戏对象类型，比如飞机、子弹、主角
    public type: string

    // 游戏控制器
    protected gameControl: GameControl

    constructor() {

    }

    /**
     * 游戏循环调用
     */
    public onUpdate() {

    }

    /**
     * 设置游戏控制器
     */
    setGameControl(gameControl: GameControl) {
        this.gameControl = gameControl
    }
}