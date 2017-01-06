import * as PIXI from 'pixi.js'
import GameObject from '../../../../../../game-control/game-object'
import * as translate from '../../../../../../game-control/utils/translate'
import * as RX from 'rxjs'

import Bullet from './bullet'

import BaseEnemyAircraft from './base-enemy-aircraft'

export default class Boss extends BaseEnemyAircraft {
    // 当前时间
    private currentTime = 0

    // 侧翼旋转火力的数据流
    private asideFireStream = new RX.Subject<boolean>()

    // 主要武器数据流
    private fireStream = new RX.Subject<boolean>()

    constructor() {
        super(500)

        this.object = new PIXI.Sprite(
            PIXI.loader.resources['static/game/boss.png'].texture
        )
        this.object.width = 300
        this.object.height = 250
        this.object.anchor.x = 0.5
        this.object.anchor.y = 0.5
        this.object.rotation = Math.PI

        // 发射子弹的监听
        this.asideFireStream
            .throttleTime(600)
            .subscribe(() => {
                this.asideFire()
            })

        this.fireStream
            .throttleTime(500)
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
        } else if (this.currentTime % 10000 < 5000) {
            this.object.x += 1
        } else if (this.currentTime % 10000 < 10000) {
            this.object.x -= 1
        }

        // 自动开火
        this.fireStream.next(true)

        if (this.currentTime % 5000 > 3500) {
            this.asideFireStream.next(true)
        }
    }

    /**
     * 主火力
     */
    fire() {
        const bullet1 = new Bullet({
            target: 'aircraft',
            position: this.currentTime / 100 * 5 % 180 + 90,
            type: 'enemy-fighter'
        })
        bullet1.object.x = this.object.x
        bullet1.object.y = this.object.y + 125
        this.gameControl.addGameObjectToScene(bullet1)
    }

    /**
     * 侧翼旋转火力
     */
    asideFire() {
        const bullet1 = new Bullet({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        })
        bullet1.object.x = this.object.x - 60
        bullet1.object.y = this.object.y + 60
        this.gameControl.addGameObjectToScene(bullet1)

        const bullet2 = new Bullet({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        })
        bullet2.object.x = this.object.x - 20
        bullet2.object.y = this.object.y + 60
        this.gameControl.addGameObjectToScene(bullet2)

        const bullet3 = new Bullet({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        })
        bullet3.object.x = this.object.x + 60
        bullet3.object.y = this.object.y + 60
        this.gameControl.addGameObjectToScene(bullet3)

        const bullet4 = new Bullet({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        })
        bullet4.object.x = this.object.x + 20
        bullet4.object.y = this.object.y + 60
        this.gameControl.addGameObjectToScene(bullet4)
    }
}