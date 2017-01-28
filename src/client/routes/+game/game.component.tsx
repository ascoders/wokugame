import * as React from 'react'
import * as typings from './game.type'

import Game from './game/index'

export default class GameScene extends React.Component<typings.Props,any> {
    private game: Game

    componentDidMount() {
        this.game = new Game(document.getElementById('game-container'))
    }

    componentWillUnmount() {
        this.game.destroy()
    }

    render() {
        console.log('render')
        return (
            <div id="game-container"/>
        )
    }
}