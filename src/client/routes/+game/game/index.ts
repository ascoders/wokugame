import * as PIXI from 'pixi.js'
import GameObject from './base/game-object'

import Aircraft from './game-object/aircraft'

export default class Game {
    // 画布根节点
    private rootElement: HTMLElement
    // 主视图
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer
    // 主画布
    private stage: PIXI.Container
    // 维护所有游戏对象
    private gameObjects: Array<GameObject<any>> = []

    constructor(rootElement: HTMLElement) {
        this.rootElement = rootElement

        this.init()
    }

    /**
     * 初始化游戏
     */
    init() {
        // 创建主视图
        this.renderer = PIXI.autoDetectRenderer(this.rootElement.clientWidth, this.rootElement.clientHeight, {
            transparent: true
        })
        // 将主视图装载到画布根节点
        this.rootElement.appendChild(this.renderer.view)

        this.stage = new PIXI.Container()

        this.loadResource()

        // 开启游戏循环
        this.gameLoop()
    }

    /**
     * 加载初始资源
     */
    loadResource() {
        PIXI.loader
            .add("static/game/aircraft.jpg")
            .load(this.afterLoadResource.bind(this))
    }

    /**
     * 资源加载完毕后
     */
    afterLoadResource() {
        // 实例化飞机
        const aircraft = new Aircraft()
        this.gameObjects.push(aircraft)

        // 将游戏对象依次加载到场景中
        this.gameObjects.forEach(gameObject => {
            this.stage.addChild(gameObject.object)
        })

        // 刷新视图
        this.renderer.render(this.stage)
    }

    /**
     * 游戏循环处
     */
    gameLoop() {
        // 每帧都调用游戏循环，使其真正循环起来
        requestAnimationFrame(this.gameLoop.bind(this))

        // 调用每个游戏对象的 onUpdate 生命周期
        this.gameObjects.forEach(gameObject => {
            gameObject.onUpdate()
        })

        // 刷新视图
        this.renderer.render(this.stage)
    }
}