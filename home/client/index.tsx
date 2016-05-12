/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings-replacement.d.ts" />

import es6Promise = require('es6-promise')
es6Promise.polyfill()

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {router} from 'fit-isomorphic-redux-tools'
import routes from './routes'
import {basename} from './config'
import reducer from './reducer'
import './index.scss'

const routerElement = router(routes, basename, reducer)

ReactDOM.render(routerElement, document.getElementById('react-dom'))