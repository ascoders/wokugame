import * as React from 'react'
import * as typings from './game.type'
import {connect} from '../../../../frame/index'
const styles = require('./game.css')

import game from './game/index'

@connect<Models.Root>(state => {
    return {}
})
export default class Game extends React.Component<typings.Props,any> {
    componentDidMount() {
        new game(document.getElementById('game-container'))
    }

    render() {
        return (
            <div id="game-container"/>
        )
    }
}