"use strict";
const Sequelize = require('sequelize');
const connect_1 = require('../connect');
exports.member = connect_1.default.define('member', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(10),
        unique: true,
        comment: '用户名'
    },
    create: {
        type: Sequelize.DATE,
        comment: '注册时间'
    }
});
