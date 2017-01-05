"use strict";
const game_object_1 = require("../../../../../../game-control/game-object");
const RX = require("rxjs");
const bomb_aircraft_1 = require("./bomb-aircraft");
class Aircraft extends game_object_1.default {
    constructor(hp) {
        super();
        this.type = 'enemyAircraft';
        this.hp = 4;
        this.attackedColorStream = new RX.Subject();
        this.attackedColorCount = -1;
        this.hp = hp;
        this.attackedColorStream
            .throttleTime(30)
            .subscribe(() => {
            switch (this.attackedColorCount) {
                case 0:
                    this.attackedColorCount = 1;
                    this.object.tint = 0xffdfdf;
                    break;
                case 1:
                    this.attackedColorCount = 2;
                    this.object.tint = 0xffbdbd;
                    break;
                case 2:
                    this.attackedColorCount = 3;
                    this.object.tint = 0xffdfdf;
                    break;
                case 3:
                    this.attackedColorCount = -1;
                    this.object.tint = 0xffffff;
                    break;
            }
        });
    }
    attacked(damage) {
        this.hp -= damage;
        this.attackedColorCount = 0;
        if (this.hp === 0) {
            const bomb = new bomb_aircraft_1.default();
            bomb.object.x = this.object.x;
            bomb.object.y = this.object.y;
            this.gameControl.addGameObjectToScene(bomb);
            this.gameControl.destoryGameObject(this);
        }
    }
    onUpdate() {
        this.attackedColorStream.next(1);
        if (this.object.y > this.gameControl.rootElement.clientHeight + 100) {
            this.gameControl.destoryGameObject(this);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Aircraft;
//# sourceMappingURL=base-enemy-aircraft.js.map