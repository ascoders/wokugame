import * as PIXI from 'pixi.js'
import GameObject from '../../../../../../game-control/game-object'
import * as translate from '../../../../../../game-control/utils/translate'
import * as RX from 'rxjs'

import Bullet from './bullet'
import BombAircraft from './bomb-aircraft'

export default class Aircraft extends GameObject<PIXI.Sprite> {
    // 子弹发射间隔
    private fireInterval = 200

    // 移动速度
    private moveSpeed = 15

    // 鼠标最后点击位置
    private mouseLastPositionX: number = null
    private mouseLastPositionY: number = null

    // 鼠标是否弹开
    private hasMouseUp = true

    // 发射子弹的数据流
    private fireStream = new RX.Subject<boolean>()

    // 距离鼠标按下位置，飞机相对的位置
    private offsetMouseX = 0
    private offsetMouseY = 0

    public type = 'aircraft'

    constructor() {
        super()

        const texture = PIXI.utils.TextureCache['static/game/my-aircraft.png']
        texture.frame = new PIXI.Rectangle(650, 0, 131, 128)

        this.object = new PIXI.Sprite(texture)
        this.object.width = 100
        this.object.height = 100
        this.object.x = 200
        this.object.y = 300
        this.object.anchor.x = 0.5
        this.object.anchor.y = 0.75

        this.addListener()
    }

    private addListener() {
        document.addEventListener('mousedown', event => {
            this.offsetMouseX = this.object.x - event.clientX
            this.offsetMouseY = this.object.y - event.clientY

            this.mouseLastPositionX = event.clientX + this.offsetMouseX
            this.mouseLastPositionY = event.clientY + this.offsetMouseY
            this.hasMouseUp = false
        })

        document.addEventListener('mousemove', event => {
            if (this.hasMouseUp) {
                return
            }
            this.mouseLastPositionX = event.clientX + this.offsetMouseX
            this.mouseLastPositionY = event.clientY + this.offsetMouseY
        })

        document.addEventListener('mouseup', event => {
            this.mouseLastPositionX = null
            this.mouseLastPositionY = null
            this.hasMouseUp = true
        })

        // 发射子弹的监听
        this.fireStream
            .throttleTime(this.fireInterval)
            .subscribe(() => {
                this.fire()
            })
    }

    /**
     * 主角死亡
     */
    private die() {
        // 爆炸效果
        const bomb = new BombAircraft()
        bomb.object.x = this.object.x
        bomb.object.y = this.object.y
        this.gameControl.addGameObjectToScene(bomb)

        // 暂停游戏
        this.gameControl.pause(1000)

        // 销毁自己
        this.gameControl.destoryGameObject(this)
    }

    public onUpdate() {
        // 撞到敌机立刻死亡
        this.gameControl.currentScene.gameObjects.forEach(gameObject => {
            if (gameObject.type === 'enemyAircraft') {
                if (translate.isHit(this.object, gameObject.object)) {
                    this.die()
                }
            }
        })

        // 鼠标移开就会停止
        if (this.hasMouseUp) {
            return
        }

        // 移动到鼠标位置
        this.move()

        // 自动开火
        this.fireStream.next(true)
    }

    /**
     * 移动
     */
    move() {
        if (this.mouseLastPositionX !== null && this.mouseLastPositionY !== null) {
            const moveResult = translate.translateMovement({
                x: this.object.x,
                y: this.object.y
            }, {
                x: this.mouseLastPositionX,
                y: this.mouseLastPositionY
            }, this.moveSpeed)

            this.object.x += moveResult.x
            this.object.y += moveResult.y
        }
    }

    /**
     * 发射子弹
     */
    fire() {
        const bullet = new Bullet({
            target: 'enemyAircraft',
            position: 0
        })
        bullet.object.x = this.object.x
        bullet.object.y = this.object.y - 80
        this.gameControl.addGameObjectToScene(bullet, 'main')

        // const bullet1 = new Bullet(5)
        // bullet1.object.x = this.object.x
        // bullet1.object.y = this.object.y - 80
        // this.gameControl.addGameObjectToScene(bullet1, 'main')
        //
        // const bullet2 = new Bullet(-5)
        // bullet2.object.x = this.object.x
        // bullet2.object.y = this.object.y - 80
        // this.gameControl.addGameObjectToScene(bullet2, 'main')
    }

    /**
     * 受到伤害
     */
    public attacked(damage: number) {
        this.die()
    }
}