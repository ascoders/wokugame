import * as PIXI from 'pixi.js'
import GameObject from '../../../../../../game-control/game-object'
import * as translate from '../../../../../../game-control/utils/translate'
import * as RX from 'rxjs'

export interface Option {
    target: string
    position: number
    damage?: number
    type?: string
}

import EnemyAircraft from './enemy-aircraft'
import BoomBullet from './bomb-bullet'

export default class Bullet extends GameObject<PIXI.Graphics> {
    // 子弹速度
    private speed = 10

    // 攻击力
    private damage = 1

    // 子弹方向
    private position = 0

    // 目标
    private target: string

    // 子弹类型
    private bulletType = 'my-normal'

    public type = 'bullet'

    constructor(option: Option) {
        super()

        this.position = option.position || 0
        this.damage = option.damage || 1
        this.target = option.target
        this.bulletType = option.type || 'my-normal'

        switch (this.bulletType) {
            case 'my-normal':
                this.object = new PIXI.Graphics()
                this.object.beginFill(0x66CCFF)
                this.object.drawEllipse(0, 0, 5, 10)
                this.object.endFill()
                this.speed = 10
                break

            case 'enemy-normal':
                this.object = new PIXI.Graphics()
                this.object.beginFill(0x168cc7)
                this.object.drawEllipse(0, 0, 5, 10)
                this.object.endFill()
                this.speed = 4
                break

            case 'enemy-fighter':
                this.object = new PIXI.Graphics()
                this.object.beginFill(0x310077)
                this.object.drawEllipse(0, 0, 10, 15)
                this.object.endFill()
                this.speed = 3
                break
        }
    }

    public onUpdate() {
        // 直接飞
        const moveMoment = translate.directionMovement(this.position, this.speed)
        this.object.x += moveMoment.x
        this.object.y += moveMoment.y

        // 飞过界了销毁
        if (this.object.y <= -10 || this.object.y >= this.gameControl.rootElement.clientHeight + 10) {
            this.gameControl.destoryGameObject(this)
        }

        if (this.object.x <= -10 || this.object.x >= this.gameControl.rootElement.clientWidth + 10) {
            this.gameControl.destoryGameObject(this)
        }

        // 检测有没有撞到飞机
        let hasHit = false
        this.gameControl.currentScene.gameObjects.forEach(gameObject => {
            if (hasHit) {
                return
            }

            if (gameObject.type === this.target) {
                const gameObjectEA = gameObject as EnemyAircraft

                if (translate.isHit(this.object, gameObject.object)) {
                    hasHit = true

                    // 造成伤害
                    gameObjectEA.attacked(this.damage)

                    // 爆炸效果
                    const bomb = new BoomBullet()
                    bomb.object.x = this.object.x
                    bomb.object.y = this.object.y
                    this.gameControl.addGameObjectToScene(bomb)

                    // 销毁自己
                    this.gameControl.destoryGameObject(this)
                }
            }
        })
    }
}