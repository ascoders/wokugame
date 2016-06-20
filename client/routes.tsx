import * as React from 'react'
import {Route, IndexRoute} from 'react-router'
import * as process from 'process'

import Layout from './routes/layout'

declare var require: any

/**
 * nodejs mock require.ensure
 */
if (typeof(require.ensure) !== 'function') {
    require.ensure = function (modules: Array<string>, callback: Function) {
        callback(require)
    }
}

const getHome = (nextState: any, callback: any)=> {
    require.ensure([], function (require: any) {
        callback(null, require('./routes/home').default)
    })
}

const getLogin = (nextState: any, callback: any)=> {
    require.ensure([], function (require: any) {
        callback(null, require('./routes/login').default)
    })
}

const getRegister = (nextState: any, callback: any)=> {
    require.ensure([], function (require: any) {
        callback(null, require('./routes/register').default)
    })
}

export default (
    <Route path="/"
           component={Layout}>
        <IndexRoute getComponent={getHome}/>
        <Route path="login"
               getComponent={getLogin}/>
        <Route path="register"
               getComponent={getRegister}/>
    </Route>
)