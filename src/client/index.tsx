import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import routes from '../store/routes'
import createStore from '../store/create-store'

const store = createStore({})
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('react-dom')
)