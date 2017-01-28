"use strict";
const typeorm_1 = require("typeorm");
const config = require("../../config");
const path = require("path");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = typeorm_1.createConnection({
    driver: {
        type: 'mysql',
        host: config.dbHostName,
        port: config.dbPort,
        username: 'root',
        password: 'test',
        database: 'woku'
    },
    entities: [
        path.join(__dirname, 'entitys/*.js')
    ],
    subscribers: [
        path.join(__dirname, "subscribers/*.js")
    ],
    autoSchemaSync: true
});
//# sourceMappingURL=db.js.map