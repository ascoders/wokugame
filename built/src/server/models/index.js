"use strict";
const Sequelize = require("sequelize");
const config = require("../../../config");
const sequelize = new Sequelize('woku', 'root', 'test', {
    host: config.dbHostName,
    port: 3306
});
var User = sequelize.define('user', {
    nickname: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});
User.sync({ force: true });
//# sourceMappingURL=index.js.map