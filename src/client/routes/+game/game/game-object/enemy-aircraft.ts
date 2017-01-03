import * as PIXI from 'pixi.js'
import GameObject from '../../../../../../game-control/game-object'
import * as translate from '../../../../../../game-control/utils/translate'
import * as RX from 'rxjs'

import BombAircraft from './bomb-aircraft'

import BaseEnemyAircraft from './base-enemy-aircraft'

export default class Aircraft extends BaseEnemyAircraft {
    constructor() {
        super(4)

        const texture = PIXI.utils.TextureCache['static/game/aircraft1.png']
        texture.frame = new PIXI.Rectangle(425, 0, 86, 88)

        this.object = new PIXI.Sprite(
            PIXI.loader.resources['static/game/aircraft1.png'].texture
        )
        this.object.width = 100
        this.object.height = 100
        this.object.anchor.x = 0.5
        this.object.anchor.y = 0.5
        this.object.rotation = Math.PI
    }

    public onUpdate() {
        super.onUpdate()

        this.object.y += 1
    }
}