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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
function getErrorMessage(validateErrors) {
    let message = '';
    validateErrors.forEach(error => {
        const reasons = Object.keys(error.constraints).map(constraintKey => {
            return error.constraints[constraintKey];
        }).join(' ');
        message += `字段 ${error.property} ${reasons}, 当前值为 ${error.value}`;
    });
    return message;
}
let EverythingSubscriber = class EverythingSubscriber {
    beforeInsert(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateErrors = yield class_validator_1.validate(event.entity);
            if (validateErrors.length > 0) {
                return Promise.reject({
                    status: 403,
                    message: getErrorMessage(validateErrors),
                    error: validateErrors
                });
            }
        });
    }
    beforeUpdate(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateErrors = yield class_validator_1.validate(event.entity, {
                skipMissingProperties: true
            });
            if (validateErrors.length > 0) {
                return Promise.reject({
                    status: 403,
                    message: getErrorMessage(validateErrors),
                    error: validateErrors
                });
            }
        });
    }
};
EverythingSubscriber = __decorate([
    typeorm_1.EventSubscriber(),
    __metadata("design:paramtypes", [])
], EverythingSubscriber);
exports.EverythingSubscriber = EverythingSubscriber;
//# sourceMappingURL=validator.js.map