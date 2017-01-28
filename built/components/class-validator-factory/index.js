"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const class_validator_1 = require("class-validator");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (EntityClass, value, isUpdate = false) => __awaiter(this, void 0, void 0, function* () {
    const entityInstance = new EntityClass();
    Object.keys(value).map(key => {
        entityInstance[key] = value[key];
    });
    const validateErrors = yield class_validator_1.validate(entityInstance, {
        skipMissingProperties: isUpdate
    });
    if (validateErrors.length > 0) {
        throw Error(validateErrors.toString());
    }
    return entityInstance;
});
//# sourceMappingURL=index.js.map