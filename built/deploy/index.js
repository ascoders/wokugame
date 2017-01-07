"use strict";
const http = require("http");
const createHandler = require("github-webhook-handler");
const handler = createHandler({ path: '/webhook', secret: 'myhashsecret' });
http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
    });
}).listen(8000);
handler.on('push', function (event) {
    console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
    console.log(event);
});
process.on('SIGINT', function () {
});
//# sourceMappingURL=index.js.map