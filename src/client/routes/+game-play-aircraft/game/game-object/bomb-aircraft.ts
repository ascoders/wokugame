import * as PIXI from 'pixi.js'
import GameObject from '../../../../../../game-control/game-object'
import * as translate from '../../../../../../game-control/utils/translate'
import * as RX from 'rxjs'

export default class BombBullet extends GameObject<PIXI.Sprite> {
    public type = 'bomb'

    // 爆炸的动画流
    private bombStream = new RX.Subject<boolean>()

    // 当前播放到第几个
    private animateIndex = 1

    constructor() {
        super()

        this.object = new PIXI.Sprite(
            PIXI.loader.resources[`/static/game/big-damage/explosion big_${this.animateIndex}.png`].texture
        )
        this.object.width = 100
        this.object.height = 100
        this.object.anchor.x = 0.5
        this.object.anchor.y = 0.5

        this.bombStream
            .throttleTime(50)
            .subscribe(() => {
                this.object.texture = PIXI.loader.resources[`/static/game/big-damage/explosion big_${this.animateIndex++}.png`].texture
                if (this.animateIndex === 12) {
                    this.gameControl.destoryGameObject(this)
                }
            })
    }

    public onUpdate() {
        this.bombStream.next(true)
    }
}