"use strict";
const express = require("express");
const config = require("../../config");
const html_1 = require("../client/html");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger_1 = require("./logger");
const morgan = require("morgan");
require("reflect-metadata");
require("./db");
const user_1 = require("./controllers/user");
const app = express();
app.use(morgan('combined', {
    stream: {
        write: message => logger_1.default.error(message.trim())
    },
    skip: (req, res) => res.statusCode < 400
}));
app.use(compression());
const builtStaticPath = process.env.NODE_ENV === 'production' ? 'built-production/static' : 'built/static';
app.use('/static', express.static(builtStaticPath));
app.use('/api', bodyParser.json());
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use('/api', user_1.default);
app.get('*', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(html_1.default);
});
process.on('uncaughtException', (error) => {
    logger_1.default.error('uncaughtException', error);
});
process.on('unhandledRejection', (error) => {
    logger_1.default.error('unhandledRejection', error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        message: error.message
    });
    logger_1.default.error('handledError', error, { requestParam: req.body });
});
app.listen(config.localPort, () => {
    if (process.env.NODE_ENV !== 'production') {
        const notifier = require('node-notifier');
        notifier.notify(`server start on port: ${config.localPort}`);
    }
});
//# sourceMappingURL=index.js.map