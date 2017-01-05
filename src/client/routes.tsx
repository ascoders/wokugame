import * as React from 'react'
import {IndexRoute, Route} from 'react-router'

declare var require: any

/**
 * nodejs mock require.ensure
 */
if (typeof(require.ensure) !== 'function') {
    require.ensure = (modules: Array<string>, callback: Function) => {
        callback(require)
    }
}

const getHome = (nextState: any, callback: any) => {
    require.ensure([], function (require: any) {
        callback(null, require('./routes/+home/home.component').default)
    })
}

const getGame = (nextState: any, callback: any) => {
    require.ensure([], function (require: any) {
        callback(null, require('./routes/+game/game.component').default)
    })
}

import LayoutComponent from './layout/layout.component'

export default (
    <Route path="/" component={LayoutComponent}>
        <IndexRoute getComponent={getHome}/>
        <Route path="game" getComponent={getGame}/>
    </Route>
)