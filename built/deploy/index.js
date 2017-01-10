"use strict";
const http = require("http");
const createHandler = require("github-webhook-handler");
const child_process_1 = require("child_process");
const config = require("../config");
const handler = createHandler({ path: '/webhook', secret: '123456' });
child_process_1.execSync(`npm run deploy`);
http.createServer((req, res) => {
    if (req.url === '/webhook') {
        handler(req, res, (err) => {
            res.statusCode = 404;
            res.end('no such location');
        });
    }
    const options = {
        host: 'localhost',
        port: config.localPort,
        path: req.url,
        method: req.method
    };
    http.request(options, response => {
        response.pipe(res);
        console.log(req.url);
    }).end();
}).listen(config.deployPort);
handler.on('push', (event) => {
    if (event.payload.ref === 'refs/heads/built') {
        child_process_1.execSync(`cp /app/node_modules /app-cache`);
        child_process_1.execSync(`rm -rf /app`);
        child_process_1.execSync(`git clone -b built --depth 1 https://github.com/ascoders/wokugame.git /app`);
        child_process_1.execSync(`mv /app-cache /app/node_modules`);
        child_process_1.execSync(`cd /app`);
        child_process_1.execSync(`npm run pm2-restart`);
    }
});
process.on('SIGINT', () => {
    child_process_1.execSync(`npm run pm2-stop`);
});
//# sourceMappingURL=index.js.map