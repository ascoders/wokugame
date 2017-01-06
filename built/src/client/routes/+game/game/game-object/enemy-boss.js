"use strict";
const PIXI = require("pixi.js");
const RX = require("rxjs");
const bullet_1 = require("./bullet");
const base_enemy_aircraft_1 = require("./base-enemy-aircraft");
class Boss extends base_enemy_aircraft_1.default {
    constructor() {
        super(400);
        this.currentTime = 0;
        this.asideFireStream = new RX.Subject();
        this.fireStream = new RX.Subject();
        this.object = new PIXI.Sprite(PIXI.loader.resources['static/game/boss.png'].texture);
        this.object.width = 300;
        this.object.height = 250;
        this.object.anchor.x = 0.5;
        this.object.anchor.y = 0.5;
        this.object.rotation = Math.PI;
        this.asideFireStream
            .throttleTime(600)
            .subscribe(() => {
            this.asideFire();
        });
        this.fireStream
            .throttleTime(500)
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
        else if (this.currentTime % 10000 < 5000) {
            this.object.x += 1;
        }
        else if (this.currentTime % 10000 < 10000) {
            this.object.x -= 1;
        }
        this.fireStream.next(true);
        if (this.currentTime % 5000 > 3500) {
            this.asideFireStream.next(true);
        }
    }
    fire() {
        const bullet1 = new bullet_1.default({
            target: 'aircraft',
            position: this.currentTime / 100 * 5 % 180 + 90,
            type: 'enemy-fighter'
        });
        bullet1.object.x = this.object.x;
        bullet1.object.y = this.object.y + 125;
        this.gameControl.addGameObjectToScene(bullet1);
    }
    asideFire() {
        const bullet1 = new bullet_1.default({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        });
        bullet1.object.x = this.object.x - 60;
        bullet1.object.y = this.object.y + 60;
        this.gameControl.addGameObjectToScene(bullet1);
        const bullet2 = new bullet_1.default({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        });
        bullet2.object.x = this.object.x - 20;
        bullet2.object.y = this.object.y + 60;
        this.gameControl.addGameObjectToScene(bullet2);
        const bullet3 = new bullet_1.default({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        });
        bullet3.object.x = this.object.x + 60;
        bullet3.object.y = this.object.y + 60;
        this.gameControl.addGameObjectToScene(bullet3);
        const bullet4 = new bullet_1.default({
            target: 'aircraft',
            position: 180,
            type: 'enemy-fighter'
        });
        bullet4.object.x = this.object.x + 20;
        bullet4.object.y = this.object.y + 60;
        this.gameControl.addGameObjectToScene(bullet4);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Boss;
//# sourceMappingURL=enemy-boss.js.map