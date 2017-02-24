"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const game_object_1 = require("../../../../../../game-control/game-object");
const translate = require("../../../../../../game-control/utils/translate");
const bomb_bullet_1 = require("./bomb-bullet");
class Bullet extends game_object_1.default {
    constructor(option) {
        super();
        this.speed = 10;
        this.damage = 1;
        this.position = 0;
        this.bulletType = 'my-normal';
        this.type = 'bullet';
        this.position = option.position || 0;
        this.damage = option.damage || 1;
        this.target = option.target;
        this.bulletType = option.type || 'my-normal';
        switch (this.bulletType) {
            case 'my-normal':
                this.object = new PIXI.Graphics();
                this.object.beginFill(0x66CCFF);
                this.object.drawEllipse(0, 0, 5, 10);
                this.object.endFill();
                this.speed = 10;
                break;
            case 'enemy-normal':
                this.object = new PIXI.Graphics();
                this.object.beginFill(0x168cc7);
                this.object.drawEllipse(0, 0, 5, 10);
                this.object.endFill();
                this.speed = 4;
                break;
            case 'enemy-fighter':
                this.object = new PIXI.Graphics();
                this.object.beginFill(0x310077);
                this.object.drawEllipse(0, 0, 5, 10);
                this.object.endFill();
                this.speed = 3;
                break;
        }
        this.object.rotation = Math.PI / 180 * this.position;
    }
    onUpdate() {
        const moveMoment = translate.directionMovement(this.position, this.speed);
        this.object.x += moveMoment.x;
        this.object.y += moveMoment.y;
        if (this.object.y <= -10 || this.object.y >= this.gameControl.rootElement.clientHeight + 10) {
            this.gameControl.destoryGameObject(this);
        }
        if (this.object.x <= -10 || this.object.x >= this.gameControl.rootElement.clientWidth + 10) {
            this.gameControl.destoryGameObject(this);
        }
        let hasHit = false;
        this.gameControl.currentScene.gameObjects.forEach(gameObject => {
            if (hasHit) {
                return;
            }
            if (gameObject.type === this.target) {
                const gameObjectEA = gameObject;
                if (translate.isHit(this.object, gameObject.object)) {
                    hasHit = true;
                    gameObjectEA.attacked(this.damage);
                    const bomb = new bomb_bullet_1.default();
                    bomb.object.x = this.object.x;
                    bomb.object.y = this.object.y;
                    this.gameControl.addGameObjectToScene(bomb);
                    this.gameControl.destoryGameObject(this);
                }
            }
        });
    }
}
exports.default = Bullet;
//# sourceMappingURL=bullet.js.map