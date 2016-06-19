"use strict";
const Sequelize = require('sequelize');
const config_1 = require('../config');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Sequelize(config_1.moduleName, 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
