"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const service_1 = require('fit-isomorphic-redux-tools/lib/service');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = service_1.initService;
require('../games/endless-battle');
class Service {
    simpleGet(options) {
        return `got get: ${options.name}`;
    }
    simplePost(options) {
        return `got post: ${options.name}`;
    }
}
__decorate([
    service_1.routerDecorator('/api/simple-get-function', 'get')
], Service.prototype, "simpleGet", null);
__decorate([
    service_1.routerDecorator('/api/simple-post-function', 'post')
], Service.prototype, "simplePost", null);
new Service();
