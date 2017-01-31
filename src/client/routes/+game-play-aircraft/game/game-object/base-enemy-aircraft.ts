import * as PIXI from 'pixi.js'
import GameObject from '../../../../../../game-control/game-object'
import * as translate from '../../../../../../game-control/utils/translate'
import * as RX from 'rxjs'

import BombAircraft from './bomb-aircraft'

export default class Aircraft extends GameObject<PIXI.Sprite> {
    public type = 'enemyAircraft'

    // 生命值
    private hp = 4

    // 受到攻击后变红的流
    private attackedColorStream = new RX.Subject<number>()

    // 受到攻击后变红计数器
    private attackedColorCount = -1

    constructor(hp: number) {
        super()

        this.hp = hp

        this.attackedColorStream
            .throttleTime(30)
            .subscribe(() => {
                switch (this.attackedColorCount) {
                    case 0:
                        this.attackedColorCount = 1

                        this.object.tint = 0xffdfdf
                        break
                    case 1:
                        this.attackedColorCount = 2

                        this.object.tint = 0xffbdbd
                        break
                    case 2:
                        this.attackedColorCount = 3

                        this.object.tint = 0xffdfdf
                        break
                    case 3:
                        this.attackedColorCount = -1

                        this.object.tint = 0xffffff
                        break
                }
            })
    }

    /**
     * 受到伤害
     */
    public attacked(damage: number) {
        this.hp -= damage

        this.attackedColorCount = 0

        if (this.hp === 0) {
            // 爆炸
            const bomb = new BombAircraft()
            bomb.object.x = this.object.x
            bomb.object.y = this.object.y
            this.gameControl.addGameObjectToScene(bomb)

            this.gameControl.destoryGameObject(this)
        }
    }

    public onUpdate() {
        this.attackedColorStream.next(1)

        // 如果超出底部，移除
        if (this.object.y > this.gameControl.rootElement.clientHeight + 100) {
            this.gameControl.destoryGameObject(this)
        }
    }
}