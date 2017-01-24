"use strict";
const Sequelize = require("sequelize");
const config = require("../../../config");
const user = require("./user");
const db = new Sequelize('woku', 'root', 'test', {
    host: config.dbHostName,
    port: 3306
});
let User = user.model(db);
exports.User = User;
db.sync({ force: true });
//# sourceMappingURL=index.js.map