import * as React from 'react'
import * as typings from './game.type'
import {connect} from '../../../../frame/index'
const styles = require('./game.css')

import Game from './game/index'

@connect<Models.Root>(state => {
    return {}
})
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