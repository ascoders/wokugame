import * as PIXI from 'pixi.js'
import GameObject from '../../../../../../game-control/game-object'
import * as translate from '../../../../../../game-control/utils/translate'
import * as RX from 'rxjs'

import Bullet from './bullet'

import BaseEnemyAircraft from './base-enemy-aircraft'

export default class Bomber extends BaseEnemyAircraft {
    // 当前时间
    private currentTime = 0

    // 发射子弹的数据流
    private fireStream = new RX.Subject<boolean>()

    constructor() {
        super(20)

        const texture = PIXI.utils.TextureCache['static/game/aircraft2.png']
        texture.frame = new PIXI.Rectangle(310, 0, 76, 88)

        this.object = new PIXI.Sprite(
            PIXI.loader.resources['static/game/aircraft2.png'].texture
        )
        this.object.width = 120
        this.object.height = 120
        this.object.anchor.x = 0.5
        this.object.anchor.y = 0.5
        this.object.rotation = Math.PI

        // 发射子弹的监听
        this.fireStream
            .throttleTime(2000)
            .subscribe(() => {
                this.fire()
            })
    }

    public onUpdate() {
        super.onUpdate()

        // 当前时间累加
        this.currentTime += 1 / 60 * 1000

        if (this.currentTime < 4000) {
            this.object.y += 1
        } else if (this.currentTime < 6000) {
            this.object.x += 1
        } else if (this.currentTime < 10000) {
            this.object.x -= 1
        } else if (this.currentTime < 12000) {
            this.object.x += 1
        } else {
            this.object.y += 1
        }

        // 自动开火
        this.fireStream.next(true)
    }

    /**
     * 发射子弹
     */
    fire() {
        const bullet1 = new Bullet({
            target: 'aircraft',
            position: 180,
            type: 'enemy-normal'
        })
        bullet1.object.x = this.object.x - 35
        bullet1.object.y = this.object.y + 70
        this.gameControl.addGameObjectToScene(bullet1)

        const bullet2 = new Bullet({
            target: 'aircraft',
            position: 180,
            type: 'enemy-normal'
        })
        bullet2.object.x = this.object.x + 35
        bullet2.object.y = this.object.y + 70
        this.gameControl.addGameObjectToScene(bullet2)
    }
}