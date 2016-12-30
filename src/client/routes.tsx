import * as React from 'react'
import {IndexRoute, Route} from 'react-router'

import LayoutComponent from './layout/layout.component'
import HomeComponent from './routes/+home/home.component'
import GameComponent from './routes/+game/game.component'

export default (
    <Route path="/" component={LayoutComponent}>
        <IndexRoute component={HomeComponent}/>
        <Route path="game" component={GameComponent}/>
    </Route>
)