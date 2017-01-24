"use strict";
const express = require("express");
const config = require("../../config");
const html_1 = require("../client/html");
const compression = require("compression");
const bodyParser = require("body-parser");
require("./models");
const user_1 = require("./controllers/user");
const app = express();
const builtStaticPath = process.env.NODE_ENV === 'production' ? 'built-production/static' : 'built/static';
app.use(compression());
app.use('/static', express.static(builtStaticPath));
app.use('/api', bodyParser());
app.use('/api', user_1.default);
app.get('*', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(html_1.default);
});
process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
});
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message,
        error: err
    });
});
app.listen(config.localPort, function () {
    console.log(`woku app listening on port ${config.localPort}!`);
});
//# sourceMappingURL=index.js.map