import * as React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './routes/layout/index'
import Home from './routes/home/index'
import PageA from './routes/page-a/index'

export default (
    <Route path="/"
           component={Layout}>
        <IndexRoute component={Home}/>
        <Route path="page-a"
               component={PageA}/>
    </Route>
)