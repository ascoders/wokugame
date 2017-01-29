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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mobx_1 = require("mobx");
const mobx_async_class_1 = require("../mobx-async-class");
class LoginPageStore {
    constructor() {
        this.nickname = '';
        this.password = '';
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], LoginPageStore.prototype, "nickname", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", String)
], LoginPageStore.prototype, "password", void 0);
let LoginPage = class LoginPage {
    constructor() {
        this.store = new LoginPageStore();
    }
    setNickname(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.nickname = nickname;
        });
    }
    setPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.password = password;
        });
    }
};
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginPage.prototype, "setNickname", null);
__decorate([
    mobx_1.action.bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoginPage.prototype, "setPassword", null);
LoginPage = __decorate([
    mobx_async_class_1.default,
    __metadata("design:paramtypes", [])
], LoginPage);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
//# sourceMappingURL=login.page.js.map