"use strict";
const http = require("http");
const createHandler = require("github-webhook-handler");
const config = require("../config");
const handler = createHandler({ path: '/webhook', secret: '123456' });
http.createServer((req, res) => {
    handler(req, res, (err) => {
        res.statusCode = 404;
        res.end('no such location');
    });
}).listen(config.deployPort);
handler.on('push', (event) => {
    console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
    console.log(123123, event);
});
process.on('SIGINT', () => {
});
//# sourceMappingURL=index.js.map