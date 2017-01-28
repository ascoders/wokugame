"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const mobx_1 = require("mobx");
class UserStore {
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], UserStore.prototype, "currentUser", void 0);
class User {
    constructor() {
        this.store = new UserStore();
    }
    setCurrentUser(user) {
        this.store.currentUser = user;
    }
    loginWithNicknamePassword(nickname, password) {
    }
}
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], User.prototype, "setCurrentUser", null);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], User.prototype, "loginWithNicknamePassword", null);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
//# sourceMappingURL=user.js.map