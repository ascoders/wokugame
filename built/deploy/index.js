"use strict";
const http = require("http");
const createHandler = require("github-webhook-handler");
const httpProxy = require("http-proxy");
const child_process_1 = require("child_process");
const config = require("../config");
const handler = createHandler({ path: '/webhook', secret: '123456' });
try {
    child_process_1.execSync(`npm run app-run`);
}
catch (err) {
}
const proxy = httpProxy.createProxyServer({
    target: 'http://localhost:' + config.localPort
});
proxy.on('error', () => {
});
http.createServer((req, res) => {
    if (req.url === '/webhook') {
        handler(req, res, (err) => {
            res.statusCode = 404;
            res.end('no such location');
        });
    }
    else {
        proxy.web(req, res);
    }
}).listen(config.deployPort);
handler.on('push', (event) => {
    if (event.payload.ref === 'refs/heads/built') {
        child_process_1.execSync(`cd /app; git pull origin built`);
        child_process_1.execSync(`npm run app-reload`);
    }
});
handler.on('error', () => {
});
process.on('SIGINT', () => {
    child_process_1.execSync(`npm run app-stop`);
});
//# sourceMappingURL=index.js.map