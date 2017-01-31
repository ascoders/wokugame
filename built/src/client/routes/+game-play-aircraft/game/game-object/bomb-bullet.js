"use strict";
const PIXI = require("pixi.js");
const game_object_1 = require("../../../../../../game-control/game-object");
const RX = require("rxjs");
class BombBullet extends game_object_1.default {
    constructor() {
        super();
        this.type = 'bomb';
        this.bombStream = new RX.Subject();
        this.animateIndex = 1;
        this.object = new PIXI.Sprite(PIXI.loader.resources[`/static/game/air-damage/explosion air_${this.animateIndex}.png`].texture);
        this.object.width = 30;
        this.object.height = 30;
        this.object.anchor.x = 0.5;
        this.object.anchor.y = 0.5;
        this.bombStream
            .throttleTime(50)
            .subscribe(() => {
            this.object.texture = PIXI.loader.resources[`/static/game/air-damage/explosion air_${this.animateIndex++}.png`].texture;
            if (this.animateIndex === 10) {
                this.gameControl.destoryGameObject(this);
            }
        });
    }
    onUpdate() {
        this.bombStream.next(true);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BombBullet;
//# sourceMappingURL=bomb-bullet.js.map