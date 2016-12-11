import * as React from 'react'
import {IndexRoute, Route} from 'react-router'

import HomeComponent from '../client/routes/+home/home.component'

export default (
    <Route path="/">
        <IndexRoute component={HomeComponent}/>
    </Route>
)