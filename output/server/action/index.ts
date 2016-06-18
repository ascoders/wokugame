import * as React from 'react'
import routes from '../../client/routes'
import rootReducer from '../../client/reducer'
import {serverRender} from 'fit-isomorphic-redux-tools'
import * as fs from 'fs'
import * as path from 'path'
import {RequestOptions, ClientResponse} from 'http'

const htmlText = fs.readFileSync(path.join(__dirname, '../../client/index.html'), 'utf-8')

export default async(req: RequestOptions, res: ClientResponse) => {
    serverRender({
        req,
        res,
        routes,
        basename: '',
        rootReducer,
        htmlText,
        enableServerRender: true
    })
}