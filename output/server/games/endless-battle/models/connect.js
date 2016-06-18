"use strict";
const Sequelize = require('sequelize');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Sequelize('endless-battle', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
