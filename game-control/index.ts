import * as PIXI from 'pixi.js'
import GameObject from './game-object'

export interface Scene {
    stage: PIXI.Container
    gameObjects: Array<GameObject<any>>
}

export default class GameControl {
    // 画布根节点
    public rootElement: HTMLElement
    // 主视图
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer
    // 场景
    private scenes = new Map<string,Scene>()
    // 当前场景名
    private currentSceneName: string

    // 当前场景
    public get currentScene() {
        return this.scenes.get(this.currentSceneName)
    }

    // 初始资源列表
    private initResources: Array<string> = []

    // 资源加载完毕后的回调
    private handleResourcesLoaded: Function

    // 游戏循环回调
    private handleGameLoop: Function

    constructor(rootElement: HTMLElement, initResources?: Array<string>, handleResourcesLoaded?: Function, handleGameLoop?: Function) {
        this.rootElement = rootElement
        this.initResources = initResources
        this.handleResourcesLoaded = handleResourcesLoaded
        this.handleGameLoop = handleGameLoop

        this.init()
    }

    // 游戏是否暂停
    private isPause = false

    /**
     * 初始化游戏
     */
    private init() {
        // 创建主视图
        this.renderer = PIXI.autoDetectRenderer(this.rootElement.clientWidth, this.rootElement.clientHeight, {
            transparent: true
        })
        // 将主视图装载到画布根节点
        this.rootElement.appendChild(this.renderer.view)

        this.loadResource()

        // 开启游戏循环
        this.gameLoop()
    }

    /**
     * 加载初始资源
     */
    private loadResource() {
        PIXI.loader
            .add(this.initResources)
            .load(this.handleResourcesLoaded && this.handleResourcesLoaded.bind(this))
    }

    /**
     * 游戏循环处
     */
    private gameLoop() {
        if (this.isPause) {
            return
        }

        // 每帧都调用游戏循环，使其真正循环起来
        requestAnimationFrame(this.gameLoop.bind(this))

        this.handleGameLoop && this.handleGameLoop()

        if (!this.currentScene) {
            return
        }

        // 调用每个游戏对象的 onUpdate 生命周期
        this.currentScene.gameObjects.forEach(gameObject => {
            gameObject.onUpdate()
        })
        // 刷新视图
        this.renderer.render(this.currentScene.stage)
    }

    /**
     * 创建场景
     */
    public newScene(sceneName: string) {
        const stage = new PIXI.Container()
        this.scenes.set(sceneName, {
            stage,
            gameObjects: []
        })
    }

    /**
     * 切换场景
     */
    public goToScene(sceneName: string) {
        this.currentSceneName = sceneName
    }

    /**
     * 向场景中增加游戏对象
     */
    public addGameObjectToScene(gameObject: GameObject<any>, sceneName = this.currentSceneName) {
        if (!this.currentScene) {
            return
        }

        // 设置游戏控制器
        gameObject.setGameControl(this)

        // 添加到场景的游戏对象数组中
        this.currentScene.gameObjects.push(gameObject)

        // 将游戏对象的视图元素加载到当前场景中
        this.currentScene.stage.addChild(gameObject.object)

        // 刷新视图
        this.renderer.render(this.currentScene.stage)
    }

    /**
     * 初始化资源加载完毕回调
     */
    public onResourceLoaded(callback?: Function) {
        callback && callback()
    }

    /**
     * 销毁某个游戏对象
     * 只能销毁当前场景下的
     */
    public destoryGameObject(targetGameObject: GameObject<any>) {
        // 销毁元素视图
        this.currentScene.stage.removeChild(targetGameObject.object)

        // 在游戏对象池子中销毁
        const index = this.currentScene.gameObjects.findIndex(gameObject => gameObject === targetGameObject)
        this.currentScene.gameObjects.splice(index, 1)
    }

    /**
     * 暂停游戏
     */
    public pause(delay = 0) {
        setTimeout(() => {
            this.isPause = true
        }, delay)
    }

    /**
     * 销毁游戏
     */
    public destroy() {
        this.renderer.destroy(true)
        PIXI.loader.reset()
        this.pause()
    }
}