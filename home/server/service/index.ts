import {initService, routerDecorator} from 'fit-isomorphic-redux-tools/lib/service'
export default initService

class Service {
    @routerDecorator('/api/simple-get-function', 'get')
    simpleGet(options:any) {
        return `got get: ${options.name}`
    }

    @routerDecorator('/api/simple-post-function', 'post')
    simplePost(options:any) {
        return `got post: ${options.name}`
    }
}

new Service()