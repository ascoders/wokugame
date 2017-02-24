"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const game_object_1 = require("../../../../../../game-control/game-object");
const RX = require("rxjs");
class BombBullet extends game_object_1.default {
    constructor() {
        super();
        this.type = 'bomb';
        this.bombStream = new RX.Subject();
        this.animateIndex = 1;
        this.object = new PIXI.Sprite(PIXI.loader.resources[`/static/game/big-damage/explosion big_${this.animateIndex}.png`].texture);
        this.object.width = 100;
        this.object.height = 100;
        this.object.anchor.x = 0.5;
        this.object.anchor.y = 0.5;
        this.bombStream
            .throttleTime(50)
            .subscribe(() => {
            this.object.texture = PIXI.loader.resources[`/static/game/big-damage/explosion big_${this.animateIndex++}.png`].texture;
            if (this.animateIndex === 12) {
                this.gameControl.destoryGameObject(this);
            }
        });
    }
    onUpdate() {
        this.bombStream.next(true);
    }
}
exports.default = BombBullet;
//# sourceMappingURL=bomb-aircraft.js.map