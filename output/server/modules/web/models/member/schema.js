"use strict";
const Sequelize = require('sequelize');
const connect_1 = require('../connect');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connect_1.default.define('member', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(10),
        unique: true
    },
    email: {
        type: Sequelize.STRING(30)
    },
    password: {
        type: Sequelize.STRING(32)
    },
    create: {
        type: Sequelize.DATE
    }
});
