/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings-replacement.d.ts" />


import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {router} from 'fit-isomorphic-redux-tools'
import routes from './routes'
import reducer from './reducer'

import './index.scss'

const routerElement = router(routes, '', reducer)

ReactDOM.render(routerElement, document.getElementById('react-dom'))