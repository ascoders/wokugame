"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const RX = require("rxjs");
const bullet_1 = require("./bullet");
const base_enemy_aircraft_1 = require("./base-enemy-aircraft");
class Bomber extends base_enemy_aircraft_1.default {
    constructor() {
        super(20);
        this.currentTime = 0;
        this.fireStream = new RX.Subject();
        const texture = PIXI.utils.TextureCache['/static/game/aircraft2.png'];
        texture.frame = new PIXI.Rectangle(310, 0, 76, 88);
        this.object = new PIXI.Sprite(PIXI.loader.resources['/static/game/aircraft2.png'].texture);
        this.object.width = 120;
        this.object.height = 120;
        this.object.anchor.x = 0.5;
        this.object.anchor.y = 0.5;
        this.object.rotation = Math.PI;
        this.fireStream
            .throttleTime(2000)
            .subscribe(() => {
            this.fire();
        });
    }
    onUpdate() {
        super.onUpdate();
        this.currentTime += 1 / 60 * 1000;
        if (this.currentTime < 4000) {
            this.object.y += 1;
        }
        else if (this.currentTime < 6000) {
            this.object.x += 1;
        }
        else if (this.currentTime < 10000) {
            this.object.x -= 1;
        }
        else if (this.currentTime < 12000) {
            this.object.x += 1;
        }
        else {
            this.object.y += 1;
        }
        this.fireStream.next(true);
    }
    fire() {
        const bullet1 = new bullet_1.default({
            target: 'aircraft',
            position: 180,
            type: 'enemy-normal'
        });
        bullet1.object.x = this.object.x - 35;
        bullet1.object.y = this.object.y + 70;
        this.gameControl.addGameObjectToScene(bullet1);
        const bullet2 = new bullet_1.default({
            target: 'aircraft',
            position: 180,
            type: 'enemy-normal'
        });
        bullet2.object.x = this.object.x + 35;
        bullet2.object.y = this.object.y + 70;
        this.gameControl.addGameObjectToScene(bullet2);
    }
}
exports.default = Bomber;
//# sourceMappingURL=enemy-bomber.js.map