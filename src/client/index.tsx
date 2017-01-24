import * as React from 'react'
import * as ReactDOM from 'react-dom'
import routes from './routes'

import 'isomorphic-fetch'

import God from '../../frame/index'

import Models from './models'

import '../../components/css-reset/index.css'
import '../../components/css-beautify/index.css'

const app = new God()

app.use()

app.router(routes)

Models.forEach(model => {
    app.model(model)
})

ReactDOM.render(app.render(), document.getElementById('react-dom'))