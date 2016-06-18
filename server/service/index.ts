import {initService, routerDecorator} from 'fit-isomorphic-redux-tools/lib/service'
export default initService

/**
 * 引入无尽的战斗
 */
import '../games/endless-battle'

class Service {
    @routerDecorator('/api/simple-get-function', 'get')
    simpleGet(options: any) {
        return `got get: ${options.name}`
    }

    @routerDecorator('/api/simple-post-function', 'post')
    simplePost(options: any) {
        return `got post: ${options.name}`
    }
}

new Service()