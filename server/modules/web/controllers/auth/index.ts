import {routerDecorator} from 'fit-isomorphic-redux-tools/lib/service'
import {moduleName} from '../../config'
import * as path from 'path'

const setPrefix = (url: string)=> {
    return path.join('/api', moduleName, 'auth', url)
}

class Service {
    @routerDecorator(setPrefix('test'), 'get')
    simpleGet(options: any) {
        return `got get: ${options.name}`
    }
}

new Service()