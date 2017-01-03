import * as PIXI from 'pixi.js'
import GameObject from '../../../../../../game-control/game-object'
import * as translate from '../../../../../../game-control/utils/translate'
import * as RX from 'rxjs'

import Bullet from './bullet'

import BaseEnemyAircraft from './base-enemy-aircraft'

export default class Fighter extends BaseEnemyAircraft {
    // 当前时间
    private currentTime = 0

    // 上一次本地时间
    private lastLocalTime = new Date().getTime()

    // 发射子弹的数据流
    private fireStream = new RX.Subject<boolean>()

    // 发射侧翼子弹数据流
    private fireSecondStream = new RX.Subject<boolean>()

    constructor() {
        super(60)

        const texture = PIXI.utils.TextureCache['static/game/aircraft3.png']
        texture.frame = new PIXI.Rectangle(840, 0, 140, 128)

        this.object = new PIXI.Sprite(
            PIXI.loader.resources['static/game/aircraft3.png'].texture
        )
        this.object.width = 180
        this.object.height = 180
        this.object.anchor.x = 0.5
        this.object.anchor.y = 0.5
        this.object.rotation = Math.PI

        // 发射子弹的监听
        this.fireStream
            .delay(2000)
            .throttleTime(4000)
            .subscribe(() => {
                this.fire()
            })

        this.fireSecondStream
            .throttleTime(4000)
            .subscribe(() => {
                this.fireSecond()
            })
    }

    public onUpdate() {
        super.onUpdate()

        // 当前时间累加
        const currentTime = new Date().getTime()
        const timeOffset = currentTime - this.lastLocalTime
        this.lastLocalTime = currentTime
        this.currentTime += timeOffset

        if (this.currentTime < 4000) {
            this.object.y += 1
        } else if (this.currentTime < 5000) {
            this.object.y -= 1
        } else if (this.currentTime < 7000) {
            this.object.x -= 1
        } else if (this.currentTime < 10000) {
            this.object.x += 1
        } else if (this.currentTime < 12000) {
            this.object.y += 0.7
            this.object.x += 0.7
        } else if (this.currentTime < 15000) {
            this.object.y -= 0.7
            this.object.x -= 0.7
        } else if (this.currentTime < 18000) {
            this.object.x += 1
        } else if (this.currentTime < 20000) {
            this.object.x -= 1
        } else {
            this.object.y += 1
        }

        // 自动开火
        this.fireStream.next(true)
        this.fireSecondStream.next(true)
    }

    /**
     * 发射子弹
     */
    fire() {
        const bullet1 = new Bullet({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        })
        bullet1.object.x = this.object.x
        bullet1.object.y = this.object.y + 70
        this.gameControl.addGameObjectToScene(bullet1)

        const bullet2 = new Bullet({
            target: 'aircraft',
            position: 165,
            type: 'enemy-fighter'
        })
        bullet2.object.x = this.object.x
        bullet2.object.y = this.object.y + 70
        this.gameControl.addGameObjectToScene(bullet2)

        const bullet3 = new Bullet({
            target: 'aircraft',
            position: 195,
            type: 'enemy-fighter'
        })
        bullet3.object.x = this.object.x
        bullet3.object.y = this.object.y + 70
        this.gameControl.addGameObjectToScene(bullet3)
    }

    /**
     * 发射侧翼子弹
     */
    fireSecond() {
        const bullet1 = new Bullet({
            target: 'aircraft',
            position: 185,
            type: 'enemy-fighter'
        })
        bullet1.object.x = this.object.x - 50
        bullet1.object.y = this.object.y + 30
        this.gameControl.addGameObjectToScene(bullet1)

        const bullet2 = new Bullet({
            target: 'aircraft',
            position: 175,
            type: 'enemy-fighter'
        })
        bullet2.object.x = this.object.x + 50
        bullet2.object.y = this.object.y + 30
        this.gameControl.addGameObjectToScene(bullet2)
    }
}