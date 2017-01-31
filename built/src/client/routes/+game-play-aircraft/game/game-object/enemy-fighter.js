"use strict";
const PIXI = require("pixi.js");
const RX = require("rxjs");
const bullet_1 = require("./bullet");
const base_enemy_aircraft_1 = require("./base-enemy-aircraft");
class Fighter extends base_enemy_aircraft_1.default {
    constructor() {
        super(60);
        this.currentTime = 0;
        this.fireStream = new RX.Subject();
        this.fireSecondStream = new RX.Subject();
        const texture = PIXI.utils.TextureCache['/static/game/aircraft3.png'];
        texture.frame = new PIXI.Rectangle(840, 0, 140, 128);
        this.object = new PIXI.Sprite(PIXI.loader.resources['/static/game/aircraft3.png'].texture);
        this.object.width = 180;
        this.object.height = 180;
        this.object.anchor.x = 0.5;
        this.object.anchor.y = 0.5;
        this.object.rotation = Math.PI;
        this.fireStream
            .delay(2000)
            .throttleTime(4000)
            .subscribe(() => {
            this.fire();
        });
        this.fireSecondStream
            .throttleTime(4000)
            .subscribe(() => {
            this.fireSecond();
        });
    }
    onUpdate() {
        super.onUpdate();
        this.currentTime += 1 / 60 * 1000;
        if (this.currentTime < 4000) {
            this.object.y += 1;
        }
        else if (this.currentTime < 5000) {
            this.object.y -= 1;
        }
        else if (this.currentTime < 7000) {
            this.object.x -= 1;
        }
        else if (this.currentTime < 10000) {
            this.object.x += 1;
        }
        else if (this.currentTime < 12000) {
            this.object.y += 0.7;
            this.object.x += 0.7;
        }
        else if (this.currentTime < 15000) {
            this.object.y -= 0.7;
            this.object.x -= 0.7;
        }
        else if (this.currentTime < 18000) {
            this.object.x += 1;
        }
        else if (this.currentTime < 20000) {
            this.object.x -= 1;
        }
        else {
            this.object.y += 1;
        }
        this.fireStream.next(true);
        this.fireSecondStream.next(true);
    }
    fire() {
        const bullet1 = new bullet_1.default({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        });
        bullet1.object.x = this.object.x;
        bullet1.object.y = this.object.y + 70;
        this.gameControl.addGameObjectToScene(bullet1);
        const bullet2 = new bullet_1.default({
            target: 'aircraft',
            position: 165,
            type: 'enemy-fighter'
        });
        bullet2.object.x = this.object.x;
        bullet2.object.y = this.object.y + 70;
        this.gameControl.addGameObjectToScene(bullet2);
        const bullet3 = new bullet_1.default({
            target: 'aircraft',
            position: 195,
            type: 'enemy-fighter'
        });
        bullet3.object.x = this.object.x;
        bullet3.object.y = this.object.y + 70;
        this.gameControl.addGameObjectToScene(bullet3);
    }
    fireSecond() {
        const bullet1 = new bullet_1.default({
            target: 'aircraft',
            position: 185,
            type: 'enemy-fighter'
        });
        bullet1.object.x = this.object.x - 50;
        bullet1.object.y = this.object.y + 30;
        this.gameControl.addGameObjectToScene(bullet1);
        const bullet2 = new bullet_1.default({
            target: 'aircraft',
            position: 175,
            type: 'enemy-fighter'
        });
        bullet2.object.x = this.object.x + 50;
        bullet2.object.y = this.object.y + 30;
        this.gameControl.addGameObjectToScene(bullet2);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Fighter;
//# sourceMappingURL=enemy-fighter.js.map