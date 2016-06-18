"use strict";
const service_1 = require('./service');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (router) => {
    router.use(function (req, res, next) {
        /^\/api\//.test(req.path) ? next() : router.action('index')(req, res, next);
    });
    service_1.default(router);
};
