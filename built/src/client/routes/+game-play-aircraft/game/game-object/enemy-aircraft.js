"use strict";
const PIXI = require("pixi.js");
const base_enemy_aircraft_1 = require("./base-enemy-aircraft");
class Aircraft extends base_enemy_aircraft_1.default {
    constructor() {
        super(4);
        const texture = PIXI.utils.TextureCache['/static/game/aircraft1.png'];
        texture.frame = new PIXI.Rectangle(425, 0, 86, 88);
        this.object = new PIXI.Sprite(PIXI.loader.resources['/static/game/aircraft1.png'].texture);
        this.object.width = 100;
        this.object.height = 100;
        this.object.anchor.x = 0.5;
        this.object.anchor.y = 0.5;
        this.object.rotation = Math.PI;
    }
    onUpdate() {
        super.onUpdate();
        this.object.y += 1;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Aircraft;
//# sourceMappingURL=enemy-aircraft.js.map