import initService from './service'
import {RequestOptions} from "http"
import {ClientResponse} from "http"

export default (router: any) => {
    router.use(function (req: RequestOptions, res: ClientResponse, next: any) {
        /^\/api\//.test(req.path) ? next() : router.action('index')(req, res, next)
    })

    initService(router)
}