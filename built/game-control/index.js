"use strict";
const PIXI = require("pixi.js");
class GameControl {
    constructor(rootElement, initResources, handleResourcesLoaded, handleGameLoop) {
        this.scenes = new Map();
        this.initResources = [];
        this.isPause = false;
        this.rootElement = rootElement;
        this.initResources = initResources;
        this.handleResourcesLoaded = handleResourcesLoaded;
        this.handleGameLoop = handleGameLoop;
        this.init();
    }
    get currentScene() {
        return this.scenes.get(this.currentSceneName);
    }
    init() {
        this.renderer = PIXI.autoDetectRenderer(this.rootElement.clientWidth, this.rootElement.clientHeight, {
            transparent: true
        });
        this.rootElement.appendChild(this.renderer.view);
        this.loadResource();
        this.gameLoop();
    }
    loadResource() {
        PIXI.loader
            .add(this.initResources)
            .load(this.handleResourcesLoaded && this.handleResourcesLoaded.bind(this));
    }
    gameLoop() {
        if (this.isPause) {
            return;
        }
        requestAnimationFrame(this.gameLoop.bind(this));
        this.handleGameLoop && this.handleGameLoop();
        if (!this.currentScene) {
            return;
        }
        this.currentScene.gameObjects.forEach(gameObject => {
            gameObject.onUpdate();
        });
        this.renderer.render(this.currentScene.stage);
    }
    newScene(sceneName) {
        const stage = new PIXI.Container();
        this.scenes.set(sceneName, {
            stage,
            gameObjects: []
        });
    }
    goToScene(sceneName) {
        this.currentSceneName = sceneName;
    }
    addGameObjectToScene(gameObject, sceneName = this.currentSceneName) {
        if (!this.currentScene) {
            return;
        }
        gameObject.setGameControl(this);
        this.currentScene.gameObjects.push(gameObject);
        this.currentScene.stage.addChild(gameObject.object);
        this.renderer.render(this.currentScene.stage);
    }
    onResourceLoaded(callback) {
        callback && callback();
    }
    destoryGameObject(targetGameObject) {
        this.currentScene.stage.removeChild(targetGameObject.object);
        const index = this.currentScene.gameObjects.findIndex(gameObject => gameObject === targetGameObject);
        this.currentScene.gameObjects.splice(index, 1);
    }
    pause(delay = 0) {
        setTimeout(() => {
            this.isPause = true;
        }, delay);
    }
    destroy() {
        this.renderer.destroy(true);
        PIXI.loader.reset();
        this.pause();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameControl;
//# sourceMappingURL=index.js.map