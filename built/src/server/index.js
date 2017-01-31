"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const config = require("../../config");
const html_1 = require("../client/html");
const compression = require("compression");
const bodyParser = require("body-parser");
const logger_1 = require("./logger");
const morgan = require("morgan");
require("reflect-metadata");
const db_1 = require("./db");
const routes_1 = require("./routes");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectRedis = require("connect-redis");
process.on('uncaughtException', (error) => {
    logger_1.default.error('uncaughtException', error);
});
process.on('unhandledRejection', (error) => {
    logger_1.default.error('unhandledRejection', error);
});
const start = () => __awaiter(this, void 0, void 0, function* () {
    const app = express();
    app.use(morgan('combined', {
        stream: {
            write: message => logger_1.default.error(message.trim())
        },
        skip: (req, res) => res.statusCode < 400
    }));
    const RedisStore = connectRedis(expressSession);
    app.use(expressSession({
        secret: config.sessionSecret,
        cookie: {
            maxAge: config.sessionMaxAge
        },
        saveUninitialized: false,
        resave: false,
        store: new RedisStore({
            host: config.redisHostName,
            port: config.redisPort
        })
    }));
    app.use(cookieParser(config.sessionSecret));
    app.use(compression());
    const builtStaticPath = process.env.NODE_ENV === 'production' ? 'built-production/static' : 'built/static';
    app.use('/static', express.static(builtStaticPath));
    app.use('/api', bodyParser.json());
    app.use('/api', bodyParser.urlencoded({ extended: true }));
    yield db_1.default;
    app.use('/api', routes_1.default());
    app.get('*', (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(html_1.default);
    });
    app.use((error, req, res, next) => {
        res.status(error.status || 500).send({
            message: error.message
        });
        logger_1.default.error('handledError', error, { requestParam: req.body });
    });
    app.listen(config.localPort, () => {
        const notifier = require('node-notifier');
        notifier.notify(`server start on port: ${config.localPort}`);
    });
});
start();
//# sourceMappingURL=index.js.map