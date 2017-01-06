import * as http from 'http'
import * as createHandler from 'github-webhook-handler'
const handler = createHandler({path: '/webhook', secret: 'myhashsecret'})

http.createServer(function (req, res) {
    handler(req, res, function (err: any) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(8000)

handler.on('push', function (event: any) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)

    console.log(event)
})

// docker shutdown
process.on('SIGINT', function () {

})