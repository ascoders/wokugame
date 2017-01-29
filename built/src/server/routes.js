"use strict";
const express = require("express");
const typedi_1 = require("typedi");
const users_1 = require("./controllers/users");
const router = express.Router();
const wrap = (fn) => (...args) => fn(...args).catch(args[2]);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const users = typedi_1.Container.get(users_1.default);
    router.get('/users', wrap(users.findAndCountAll));
    router.post('/users', wrap(users.create));
    router.post('/users/login', wrap(users.login));
    return router;
};
//# sourceMappingURL=routes.js.map