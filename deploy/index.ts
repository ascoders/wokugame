import * as http from 'http'
import * as createHandler from 'github-webhook-handler'
import {execSync} from 'child_process'
import * as config from '../config'
const handler = createHandler({path: '/webhook', secret: '123456'})

http.createServer((req, res) => {
    handler(req, res, (err: any) => {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(config.deployPort)

handler.on('push', (event: any) => {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)

    console.log(event)
})

// docker shutdown
process.on('SIGINT', () => {

})