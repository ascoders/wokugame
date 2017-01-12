"use strict";
const PIXI = require("pixi.js");
const game_object_1 = require("../../../../../../game-control/game-object");
const translate = require("../../../../../../game-control/utils/translate");
const RX = require("rxjs");
const bullet_1 = require("./bullet");
const bomb_aircraft_1 = require("./bomb-aircraft");
class Aircraft extends game_object_1.default {
    constructor() {
        super();
        this.fireInterval = 200;
        this.moveSpeed = 15;
        this.mouseLastPositionX = null;
        this.mouseLastPositionY = null;
        this.hasMouseUp = true;
        this.fireStream = new RX.Subject();
        this.offsetMouseX = 0;
        this.offsetMouseY = 0;
        this.type = 'aircraft';
        const texture = PIXI.utils.TextureCache['static/game/my-aircraft.png'];
        texture.frame = new PIXI.Rectangle(650, 0, 131, 128);
        this.object = new PIXI.Sprite(texture);
        this.object.width = 100;
        this.object.height = 100;
        this.object.x = 200;
        this.object.y = 300;
        this.object.anchor.x = 0.5;
        this.object.anchor.y = 0.75;
        this.addListener();
    }
    addListener() {
        document.addEventListener('mousedown', event => {
            this.offsetMouseX = this.object.x - event.clientX;
            this.offsetMouseY = this.object.y - event.clientY;
            this.mouseLastPositionX = event.clientX + this.offsetMouseX;
            this.mouseLastPositionY = event.clientY + this.offsetMouseY;
            this.hasMouseUp = false;
        });
        document.addEventListener('mousemove', event => {
            if (this.hasMouseUp) {
                return;
            }
            this.mouseLastPositionX = event.clientX + this.offsetMouseX;
            this.mouseLastPositionY = event.clientY + this.offsetMouseY;
        });
        document.addEventListener('mouseup', event => {
            this.mouseLastPositionX = null;
            this.mouseLastPositionY = null;
            this.hasMouseUp = true;
        });
        document.addEventListener('touchstart', event => {
            this.offsetMouseX = this.object.x - event.touches[0].clientX;
            this.offsetMouseY = this.object.y - event.touches[0].clientY;
            this.mouseLastPositionX = event.touches[0].clientX + this.offsetMouseX;
            this.mouseLastPositionY = event.touches[0].clientY + this.offsetMouseY;
            this.hasMouseUp = false;
        });
        document.addEventListener('touchmove', event => {
            if (this.hasMouseUp) {
                return;
            }
            this.mouseLastPositionX = event.touches[0].clientX + this.offsetMouseX;
            this.mouseLastPositionY = event.touches[0].clientY + this.offsetMouseY;
        });
        document.addEventListener('touchend', event => {
            this.mouseLastPositionX = null;
            this.mouseLastPositionY = null;
            this.hasMouseUp = true;
        });
        this.fireStream
            .throttleTime(this.fireInterval)
            .subscribe(() => {
            this.fire();
        });
    }
    die() {
        const bomb = new bomb_aircraft_1.default();
        bomb.object.x = this.object.x;
        bomb.object.y = this.object.y;
        this.gameControl.addGameObjectToScene(bomb);
        this.gameControl.pause(1000);
        this.gameControl.destoryGameObject(this);
    }
    onUpdate() {
        this.gameControl.currentScene.gameObjects.forEach(gameObject => {
            if (gameObject.type === 'enemyAircraft') {
                if (translate.isHit(this.object, gameObject.object)) {
                    this.die();
                }
            }
        });
        if (this.hasMouseUp) {
            return;
        }
        this.move();
        this.fireStream.next(true);
    }
    move() {
        if (this.mouseLastPositionX !== null && this.mouseLastPositionY !== null) {
            const moveResult = translate.translateMovement({
                x: this.object.x,
                y: this.object.y
            }, {
                x: this.mouseLastPositionX,
                y: this.mouseLastPositionY
            }, this.moveSpeed);
            this.object.x += moveResult.x;
            this.object.y += moveResult.y;
        }
    }
    fire() {
        const bullet = new bullet_1.default({
            target: 'enemyAircraft',
            position: 0
        });
        bullet.object.x = this.object.x;
        bullet.object.y = this.object.y - 80;
        this.gameControl.addGameObjectToScene(bullet, 'main');
    }
    attacked(damage) {
        this.die();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Aircraft;
//# sourceMappingURL=aircraft.js.map