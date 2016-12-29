import * as React from 'react'
import * as ReactDOM from 'react-dom'
import routes from './routes'

import God from '../../frame/index'
import ApplicationModel from '../models/application'

import '../../components/css-reset/index.css'
import '../../components/css-beautify/index.css'

const app = new God()

app.use()

app.router(routes)

app.model(ApplicationModel)

ReactDOM.render(app.render(), document.getElementById('react-dom'))