import initService from './service'

export default (router: any) => {
    router.use(function (req:any, res:any, next:any) {
        /^\/api\//.test(req.path) ? next() : router.action('index')(req, res, next)
    })
   
    initService(router)
}