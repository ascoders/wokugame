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
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const dependency_inject_1 = require("../../../../components/dependency-inject");
class ApplicationAction {
    showScroll(show) {
        this.store.noScroll = !show;
    }
}
__decorate([
    dependency_inject_1.inject(store_1.default),
    __metadata("design:type", store_1.default)
], ApplicationAction.prototype, "store", void 0);
exports.default = ApplicationAction;
//# sourceMappingURL=action.js.map