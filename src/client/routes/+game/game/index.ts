import * as PIXI from 'pixi.js'
import * as RX from 'rxjs'
import GameControl from '../../../../../game-control/index'

import Aircraft from './game-object/aircraft'
import EnemyAircraft from './game-object/enemy-aircraft'
import EnemyBomber from './game-object/enemy-bomber'
import EnemyFighter from './game-object/enemy-fighter'
import EnemyBoss from './game-object/enemy-boss'

import Timer from '../../../../../game-control/utils/timer'

export default class Game {
    private gameControl: GameControl

    private timer = new Timer()

    constructor(rootElement: HTMLElement) {
        this.gameControl = new GameControl(rootElement, [
            'static/game/my-aircraft.png',
            'static/game/boss.png',
            'static/game/aircraft1.png',
            'static/game/aircraft2.png',
            'static/game/aircraft3.png',
            'static/game/air-damage/explosion air_1.png',
            'static/game/air-damage/explosion air_2.png',
            'static/game/air-damage/explosion air_3.png',
            'static/game/air-damage/explosion air_4.png',
            'static/game/air-damage/explosion air_5.png',
            'static/game/air-damage/explosion air_6.png',
            'static/game/air-damage/explosion air_7.png',
            'static/game/air-damage/explosion air_8.png',
            'static/game/air-damage/explosion air_9.png',
            'static/game/air-damage/explosion air_10.png',
            'static/game/big-damage/explosion big_1.png',
            'static/game/big-damage/explosion big_2.png',
            'static/game/big-damage/explosion big_3.png',
            'static/game/big-damage/explosion big_4.png',
            'static/game/big-damage/explosion big_5.png',
            'static/game/big-damage/explosion big_6.png',
            'static/game/big-damage/explosion big_7.png',
            'static/game/big-damage/explosion big_8.png',
            'static/game/big-damage/explosion big_9.png',
            'static/game/big-damage/explosion big_10.png',
            'static/game/big-damage/explosion big_11.png',
            'static/game/big-damage/explosion big_12.png'
        ], this.init.bind(this), this.gameLoop.bind(this))
        this.gameControl.newScene('main')
        this.gameControl.goToScene('main')
    }

    /**
     * 创建小敌机
     */
    private createEnemyAircraft(x: number) {
        const enemyAircraft = new EnemyAircraft()
        enemyAircraft.object.x = x
        enemyAircraft.object.y = -100
        this.gameControl.addGameObjectToScene(enemyAircraft)
    }

    /**
     * 创建轰炸机
     */
    private createEnemyBomber(x: number) {
        const enemyAircraft = new EnemyBomber()
        enemyAircraft.object.x = x
        enemyAircraft.object.y = -100
        this.gameControl.addGameObjectToScene(enemyAircraft)
    }

    /**
     * 创建战斗机
     */
    private createEnemyFighter(x: number) {
        const enemyAircraft = new EnemyFighter()
        enemyAircraft.object.x = x
        enemyAircraft.object.y = -100
        this.gameControl.addGameObjectToScene(enemyAircraft)
    }

    /**
     * 创建boss
     */
    private createEnemyBoss(x: number) {
        const enemyAircraft = new EnemyBoss()
        enemyAircraft.object.x = x
        enemyAircraft.object.y = -100
        this.gameControl.addGameObjectToScene(enemyAircraft)
    }

    /**
     * 初始化游戏
     */
    init() {
        const aircraft = new Aircraft()
        this.gameControl.addGameObjectToScene(aircraft, 'main')

        this.timer.createTimeNode(1000, () => {
            this.createEnemyAircraft(50)
            this.createEnemyAircraft(150)
            this.createEnemyAircraft(250)
            this.createEnemyAircraft(350)
        })

        this.timer.createTimeNode(2500, () => {
            this.createEnemyAircraft(250)
            this.createEnemyAircraft(350)
            this.createEnemyAircraft(450)
            this.createEnemyAircraft(550)
        })

        this.timer.createTimeNode(5000, () => {
            this.createEnemyAircraft(50)
            this.createEnemyAircraft(150)
            this.createEnemyAircraft(250)
            this.createEnemyAircraft(350)
            this.createEnemyAircraft(450)
            this.createEnemyAircraft(550)
        })

        this.timer.createTimeNode(3000, () => {
            this.createEnemyAircraft(50)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(150)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(250)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(350)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(450)
        })

        this.timer.createTimeNode(2000, () => {
            this.createEnemyAircraft(550)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(450)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(350)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(250)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(150)
        })

        this.timer.createTimeNode(1000, () => {
            this.createEnemyBomber(200)
            this.createEnemyBomber(600)
        })

        this.timer.createTimeNode(12000, () => {
            this.createEnemyAircraft(550)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(500)
        })
        this.timer.createTimeNode(1000, () => {
            this.createEnemyAircraft(300)
        })
        this.timer.createTimeNode(500, () => {
            this.createEnemyAircraft(100)
        })

        this.timer.createTimeNode(4000, () => {
            this.createEnemyBomber(500)
        })

        this.timer.createTimeNode(5000, () => {
            this.createEnemyAircraft(200)
        })

        this.timer.createTimeNode(1500, () => {
            this.createEnemyAircraft(600)
        })

        this.timer.createTimeNode(3000, () => {
            this.createEnemyBomber(300)
        })

        this.timer.createTimeNode(5000, () => {
            this.createEnemyBomber(600)
        })

        this.timer.createTimeNode(5000, () => {
            this.createEnemyBomber(450)
        })

        this.timer.createTimeNode(5000, () => {
            this.createEnemyFighter(300)
        })

        this.timer.createTimeNode(15000, () => {
            this.createEnemyBomber(200)
            this.createEnemyBomber(600)
        })

        this.timer.createTimeNode(15000, () => {
            this.createEnemyAircraft(50)
            this.createEnemyAircraft(150)
            this.createEnemyAircraft(250)
            this.createEnemyAircraft(350)
            this.createEnemyAircraft(450)
            this.createEnemyAircraft(550)
        })

        this.timer.createTimeNode(5000, () => {
            this.createEnemyFighter(200)
            this.createEnemyFighter(500)
        })

        this.timer.createTimeNode(25000, () => {
            this.createEnemyBoss(500)
        })
    }

    /**
     * 游戏循环
     */
    gameLoop() {
        this.timer.onUpdate()
    }
}