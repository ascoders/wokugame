import * as express from 'express'
import {Container} from 'typedi'

import Users from './controllers/users'
import GameSimulatedPlanet from './controllers/game-simulated-planet'

const router = express.Router()
const wrap = (fn: express.RequestHandler) => (...args: any[]) => (<any>fn)(...args).catch(args[2])

export default () => {
    // 用户资源
    const users = Container.get(Users)
    router.get('/user', wrap(users.getAuthenticatedUser))
    router.delete('/user', wrap(users.deleteAuthenticatedUser))
    router.get('/users', wrap(users.findAndCountAll))
    router.post('/users', wrap(users.create))
    router.post('/users/login', wrap(users.login))

    // 星球模拟资源
    const gameSimulatedPlanet = Container.get(GameSimulatedPlanet)
    router.post('/game-simulated-planet/collection', wrap(gameSimulatedPlanet.collection))
    router.get('/game-simulated-planet/user', wrap(gameSimulatedPlanet.getAuthenticatedUser))
    router.post('/game-simulated-planet/building', wrap(gameSimulatedPlanet.building))
    router.delete('/game-simulated-planet/building/:buildingId', wrap(gameSimulatedPlanet.destroyBuilding))
    router.post('/game-simulated-planet/building/:buildingId/upgrade', wrap(gameSimulatedPlanet.upgradeBuilding))

    return router
}