import * as PIXI from 'pixi.js'
import GameObject from '../base/game-object'
import * as translate from '../utils/translate'
import * as RX from 'rxjs'

export default class Aircraft extends GameObject<PIXI.Sprite> {
    // 子弹发射间隔
    private fireInterval = 400

    // 鼠标最后点击位置
    private mouseLastPositionX: number = null
    private mouseLastPositionY: number = null

    // 鼠标是否弹开
    private hasMouseUp = true

    // 发射子弹的数据流
    private fireStream = new RX.Subject<boolean>()

    constructor() {
        super()
        this.object = new PIXI.Sprite(
            PIXI.loader.resources["static/game/aircraft.jpg"].texture
        )
        this.object.width = 100
        this.object.height = 100
        this.object.x = 200
        this.object.y = 300
        this.object.anchor.x = 0.5
        this.object.anchor.y = 1

        this.addListener()
    }

    private addListener() {
        document.addEventListener('mousedown', event => {
            this.mouseLastPositionX = event.clientX
            this.mouseLastPositionY = event.clientY
            this.hasMouseUp = false
        })

        document.addEventListener('mousemove', event => {
            if (this.hasMouseUp) {
                return
            }
            this.mouseLastPositionX = event.clientX
            this.mouseLastPositionY = event.clientY
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

    public onUpdate() {
        // 鼠标移开就会停止
        if (this.hasMouseUp) {
            return
        }

        this.move()
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
            }, 20)

            this.object.x += moveResult.x
            this.object.y += moveResult.y
        }
    }

    /**
     * 发射子弹
     */
    fire() {

    }
}