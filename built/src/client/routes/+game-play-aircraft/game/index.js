"use strict";
const index_1 = require("../../../../../game-control/index");
const aircraft_1 = require("./game-object/aircraft");
const enemy_aircraft_1 = require("./game-object/enemy-aircraft");
const enemy_bomber_1 = require("./game-object/enemy-bomber");
const enemy_fighter_1 = require("./game-object/enemy-fighter");
const enemy_boss_1 = require("./game-object/enemy-boss");
const timer_1 = require("../../../../../game-control/utils/timer");
class Game {
    constructor(rootElement) {
        this.timer = new timer_1.default();
        this.gameControl = new index_1.default(rootElement, [
            '/static/game/my-aircraft.png',
            '/static/game/boss.png',
            '/static/game/aircraft1.png',
            '/static/game/aircraft2.png',
            '/static/game/aircraft3.png',
            '/static/game/air-damage/explosion air_1.png',
            '/static/game/air-damage/explosion air_2.png',
            '/static/game/air-damage/explosion air_3.png',
            '/static/game/air-damage/explosion air_4.png',
            '/static/game/air-damage/explosion air_5.png',
            '/static/game/air-damage/explosion air_6.png',
            '/static/game/air-damage/explosion air_7.png',
            '/static/game/air-damage/explosion air_8.png',
            '/static/game/air-damage/explosion air_9.png',
            '/static/game/air-damage/explosion air_10.png',
            '/static/game/big-damage/explosion big_1.png',
            '/static/game/big-damage/explosion big_2.png',
            '/static/game/big-damage/explosion big_3.png',
            '/static/game/big-damage/explosion big_4.png',
            '/static/game/big-damage/explosion big_5.png',
            '/static/game/big-damage/explosion big_6.png',
            '/static/game/big-damage/explosion big_7.png',
            '/static/game/big-damage/explosion big_8.png',
            '/static/game/big-damage/explosion big_9.png',
            '/static/game/big-damage/explosion big_10.png',
            '/static/game/big-damage/explosion big_11.png',
            '/static/game/big-damage/explosion big_12.png'
        ], this.init.bind(this), this.gameLoop.bind(this));
        this.gameControl.newScene('main');
        this.gameControl.goToScene('main');
    }
    createEnemyAircraft(x) {
        const enemyAircraft = new enemy_aircraft_1.default();
        enemyAircraft.object.x = x;
        enemyAircraft.object.y = -100;
        this.gameControl.addGameObjectToScene(enemyAircraft);
    }
    createEnemyBomber(x) {
        const enemyAircraft = new enemy_bomber_1.default();
        enemyAircraft.object.x = x;
        enemyAircraft.object.y = -100;
        this.gameControl.addGameObjectToScene(enemyAircraft);
    }
    createEnemyFighter(x) {
        const enemyAircraft = new enemy_fighter_1.default();
        enemyAircraft.object.x = x;
        enemyAircraft.object.y = -100;
        this.gameControl.addGameObjectToScene(enemyAircraft);
    }
    createEnemyBoss(x) {
        const enemyAircraft = new enemy_boss_1.default();
        enemyAircraft.object.x = x;
        enemyAircraft.object.y = -100;
        this.gameControl.addGameObjectToScene(enemyAircraft);
    }
    init() {
        const aircraft = new aircraft_1.default();
        this.gameControl.addGameObjectToScene(aircraft, 'main');
        this.timer.createTimeNode(1000, () => {
            this.createEnemyAircraft(50);
            this.createEnemyAircraft(150);
            this.createEnemyAircraft(250);
            this.createEnemyAircraft(350);
        });
        this.timer.createTimeNode(2500, () => {
            this.createEnemyAircraft(250);
            this.createEnemyAircraft(350);
            this.createEnemyAircraft(450);
            this.createEnemyAircraft(550);
        });
        this.timer.createTimeNode(5000, () => {
            this.createEnemyAircraft(50);
            this.createEnemyAircraft(150);
            this.createEnemyAircraft(250);
            this.createEnemyAircraft(350);
            this.createEnemyAircraft(450);
            this.createEnemyAircraft(550);
        });
        this.timer.createTimeNode(3000, () => {
            this.createEnemyAircraft(50);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(150);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(250);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(350);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(450);
        });
        this.timer.createTimeNode(2000, () => {
            this.createEnemyAircraft(550);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(450);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(350);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(250);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(150);
        });
        this.timer.createTimeNode(1000, () => {
            this.createEnemyBomber(200);
            this.createEnemyBomber(600);
        });
        this.timer.createTimeNode(12000, () => {
            this.createEnemyAircraft(550);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(500);
        });
        this.timer.createTimeNode(1000, () => {
            this.createEnemyAircraft(300);
        });
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(100);
        });
        this.timer.createTimeNode(4000, () => {
            this.createEnemyBomber(500);
        });
        this.timer.createTimeNode(5000, () => {
            this.createEnemyAircraft(200);
        });
        this.timer.createTimeNode(1500, () => {
            this.createEnemyAircraft(600);
        });
        this.timer.createTimeNode(3000, () => {
            this.createEnemyBomber(300);
        });
        this.timer.createTimeNode(5000, () => {
            this.createEnemyBomber(600);
        });
        this.timer.createTimeNode(5000, () => {
            this.createEnemyBomber(450);
        });
        this.timer.createTimeNode(5000, () => {
            this.createEnemyFighter(300);
        });
        this.timer.createTimeNode(15000, () => {
            this.createEnemyBomber(200);
            this.createEnemyBomber(600);
        });
        this.timer.createTimeNode(15000, () => {
            this.createEnemyAircraft(50);
            this.createEnemyAircraft(150);
            this.createEnemyAircraft(250);
            this.createEnemyAircraft(350);
            this.createEnemyAircraft(450);
            this.createEnemyAircraft(550);
        });
        this.timer.createTimeNode(5000, () => {
            this.createEnemyFighter(200);
            this.createEnemyFighter(500);
        });
        this.timer.createTimeNode(25000, () => {
            this.createEnemyBoss(500);
        });
    }
    gameLoop() {
        this.timer.onUpdate();
    }
    destroy() {
        this.gameControl.destroy();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Game;
//# sourceMappingURL=index.js.map