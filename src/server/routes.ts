import * as express from 'express'
import {Container} from 'typedi'

import Users from './controllers/users'

const router = express.Router()
const wrap = (fn: express.RequestHandler) => (...args: any[]) => (<any>fn)(...args).catch(args[2])

export default () => {
    const users = Container.get(Users)
    router.get('/users', wrap(users.findAndCountAll))
    router.post('/users', wrap(users.create))
    router.post('/users/login', wrap(users.login))

    return router
}