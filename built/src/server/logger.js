"use strict";
const winston = require("winston");
const path = require("path");
const config = require("../../config");
const fs = require("fs");
fs.existsSync(config.logDirectory) || fs.mkdirSync(config.logDirectory);
const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: path.join(config.logDirectory, 'all.log'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false
        }),
        process.env.NODE_ENV !== 'production' && new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logger;
//# sourceMappingURL=logger.js.map