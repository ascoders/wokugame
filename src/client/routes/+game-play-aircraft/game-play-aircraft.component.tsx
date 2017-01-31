import * as React from 'react'
import * as typings from './game-play-aircraft.type'

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
        return (
            <div id="game-container"/>
        )
    }
}