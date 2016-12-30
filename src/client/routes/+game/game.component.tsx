import * as React from 'react'
import * as typings from './game.type'
import {connect} from '../../../../frame/index'
const styles = require('./game.css')

import * as PIXI from 'pixi.js'

@connect<Models.Root>(state => {
    return {}
})
export default class Game extends React.Component<typings.Props,any> {
    componentDidMount() {
        const renderer = PIXI.autoDetectRenderer(256, 256, {
            transparent: true
        })
        document.getElementById('game-container').appendChild(renderer.view)

        const stage = new PIXI.Container()

        PIXI.loader
            .add("static/game/cat.png")
            .load(setup);

        function setup() {
            const cat = new PIXI.Sprite(
                PIXI.loader.resources["static/game/cat.png"].texture
            )
            cat.x = 100
            cat.y = 100

            stage.addChild(cat)

            renderer.render(stage)
        }
    }

    render() {
        return (
            <div id="game-container"/>
        )
    }
}