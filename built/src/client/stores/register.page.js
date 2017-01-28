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
class RegisterPageStore {
    constructor() {
        this.nickname = '';
        this.password = '';
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], RegisterPageStore.prototype, "nickname", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], RegisterPageStore.prototype, "password", void 0);
class RegisterPage {
    constructor() {
        this.store = new RegisterPageStore();
    }
    setNickname(nickname) {
        this.store.nickname = nickname;
    }
    setPassword(password) {
        this.store.password = password;
    }
}
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegisterPage.prototype, "setNickname", null);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegisterPage.prototype, "setPassword", null);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterPage;
//# sourceMappingURL=register.page.js.map